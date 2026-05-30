import { Alert, Center, Loader } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	type ArchivedFilterParam,
	type FeedbackDetail,
	type FeedbackListItem,
	ownerFeedbackApi,
	type RatingFilterParam,
	type ReadFilterParam,
} from "#/lib/api/owner-feedback-api";
import { useMyBusiness } from "#/lib/api/use-my-business";
import { ApiError } from "#/lib/api-client";
import { FeedbackRow } from "./components/feedback-card";
import { FeedbackDetailView } from "./components/feedback-detail";
import { FeedbackFilters } from "./components/feedback-filters";

const feedbackListKey = (
	venueId: string,
	filters: {
		rating: RatingFilterParam;
		read: ReadFilterParam;
		archived: ArchivedFilterParam;
	},
) => ["feedback", "list", venueId, filters] as const;

const feedbackDetailKey = (id: string) => ["feedback", "detail", id] as const;

export const FeedbackPage = () => {
	const queryClient = useQueryClient();
	const businessQuery = useMyBusiness();
	const venue = businessQuery.data?.venues?.[0];

	const [rating, setRating] = useState<RatingFilterParam>("all");
	const [read, setRead] = useState<ReadFilterParam>("all");
	const [archived, setArchived] = useState<ArchivedFilterParam>("no");
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const venueId = venue?.id;
	const listQuery = useQuery({
		queryKey: venueId
			? feedbackListKey(venueId, { rating, read, archived })
			: ["feedback", "list", "none"],
		queryFn: () =>
			ownerFeedbackApi.list(venueId as string, { rating, read, archived }),
		enabled: !!venueId,
	});

	const list = listQuery.data ?? [];

	// Auto-select the first item when the list loads or selection no longer
	// matches a row in the filtered set.
	useEffect(() => {
		if (list.length === 0) {
			if (selectedId !== null) setSelectedId(null);
			return;
		}
		if (!selectedId || !list.some((f) => f.id === selectedId)) {
			setSelectedId(list[0].id);
		}
	}, [list, selectedId]);

	const detailQuery = useQuery({
		queryKey: selectedId
			? feedbackDetailKey(selectedId)
			: ["feedback", "detail", "none"],
		queryFn: () => ownerFeedbackApi.get(selectedId as string),
		enabled: !!selectedId,
	});

	const markReadMutation = useMutation({
		mutationFn: (id: string) => ownerFeedbackApi.update(id, { read: true }),
		onSuccess: (updated) => {
			// Deliberately no list invalidation here. Mark-read fires implicitly
			// on selection; invalidating would refetch a list without this row
			// (when read=unread), auto-select would jump to the next unread
			// row, mark it read, and cascade through the entire list. Leaving
			// the optimistic merge keeps the just-opened row visible without
			// its unread badge until the user changes filter or reloads.
			applyDetailUpdate(updated);
			// The navbar's unread badge is a separate query, not driven by the
			// list — safe to refetch on every mark-read without triggering the
			// auto-selection cascade above.
			queryClient.invalidateQueries({ queryKey: ["feedback-unread-count"] });
		},
	});

	const archiveMutation = useMutation({
		mutationFn: ({ id, archived }: { id: string; archived: boolean }) =>
			ownerFeedbackApi.update(id, { archived }),
		onSuccess: (updated) => {
			applyDetailUpdate(updated);
			// Archive toggles change the row's membership in the active list
			// (archived=no) and the archive list (archived=yes), so refetch any
			// cached lists rather than leave a stale optimistic merge behind.
			queryClient.invalidateQueries({ queryKey: ["feedback", "list"] });
			queryClient.invalidateQueries({ queryKey: ["feedback-unread-count"] });
		},
	});

	const spamMutation = useMutation({
		mutationFn: (id: string) => ownerFeedbackApi.markSpam(id),
		onSuccess: (updated) => {
			applyDetailUpdate(updated);
			queryClient.invalidateQueries({ queryKey: ["feedback-unread-count"] });
		},
	});

	// Opening a Feedback marks it read. Fire once per selection identity —
	// list refetches with the same selection shouldn't re-mark.
	const markedRef = useRef<string | null>(null);
	const markReadMutate = markReadMutation.mutate;
	useEffect(() => {
		if (!selectedId || markedRef.current === selectedId) return;
		const row = list.find((f) => f.id === selectedId);
		if (!row || row.readAt) return;
		markedRef.current = selectedId;
		markReadMutate(selectedId);
	}, [selectedId, list, markReadMutate]);

	const applyDetailUpdate = (updated: FeedbackDetail) => {
		queryClient.setQueryData(feedbackDetailKey(updated.id), updated);
		queryClient.setQueriesData<FeedbackListItem[] | undefined>(
			{ queryKey: ["feedback", "list"] },
			(prev) => {
				if (!prev) return prev;
				return prev.map((row) =>
					row.id === updated.id ? mergeListRow(row, updated) : row,
				);
			},
		);
	};

	const unreadCount = useMemo(
		() =>
			list.filter((f) => f.readAt === null && f.spamMarkedAt === null).length,
		[list],
	);

	const detail = detailQuery.data;
	const detailMutating =
		archiveMutation.isPending ||
		spamMutation.isPending ||
		markReadMutation.isPending;

	const handleMarkSpam = () => {
		if (!detail) return;
		const voucherWillBeVoided = detail.voucher?.status === "active";
		const message = voucherWillBeVoided
			? "Oznaczyć tę opinię jako spam? Powiązany kod rabatowy zostanie unieważniony."
			: "Oznaczyć tę opinię jako spam?";
		if (!window.confirm(message)) return;
		spamMutation.mutate(detail.id);
	};

	if (businessQuery.isPending) {
		return (
			<Center h="50vh">
				<Loader color="var(--fb-primary)" />
			</Center>
		);
	}

	if (businessQuery.isError && !(businessQuery.error instanceof ApiError)) {
		return (
			<div style={{ padding: "28px 32px" }}>
				<Alert color="red" variant="light">
					Nie udało się załadować danych firmy.
				</Alert>
			</div>
		);
	}

	if (!venue) {
		return (
			<div style={{ padding: "28px 32px" }}>
				<Alert color="yellow" variant="light">
					Najpierw przejdź przez konfigurację swojej restauracji.
				</Alert>
			</div>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				height: "100%",
				minHeight: "calc(100vh - 50px)",
			}}
		>
			<div
				style={{
					width: 340,
					borderRight: "0.5px solid rgba(12,10,7,0.08)",
					display: "flex",
					flexDirection: "column",
					flexShrink: 0,
				}}
			>
				<div style={{ padding: "18px 18px 12px" }}>
					<div
						style={{
							fontFamily: "var(--fb-serif)",
							fontSize: 24,
							fontStyle: "italic",
							letterSpacing: "-0.01em",
							color: "var(--fb-ink)",
						}}
					>
						Opinie
					</div>
					<div
						style={{
							fontFamily: "var(--fb-mono)",
							fontSize: 11,
							color: "rgba(12,10,7,0.5)",
							marginTop: 3,
						}}
					>
						{list.length} wpisów · {unreadCount} nieprzeczytanych
					</div>
					<FeedbackFilters
						rating={rating}
						read={read}
						archived={archived}
						onRatingChange={setRating}
						onReadChange={setRead}
						onArchivedChange={setArchived}
					/>
				</div>
				<div style={{ flex: 1, overflowY: "auto" }}>
					{listQuery.isPending && (
						<Center py={40}>
							<Loader color="var(--fb-primary)" />
						</Center>
					)}
					{!listQuery.isPending && list.length === 0 && (
						<div
							style={{
								padding: "32px 18px",
								color: "rgba(12,10,7,0.5)",
								fontSize: 13,
								textAlign: "center",
							}}
						>
							Brak opinii pasujących do filtrów.
						</div>
					)}
					{list.map((item) => (
						<FeedbackRow
							key={item.id}
							item={item}
							selected={selectedId === item.id}
							onClick={() => setSelectedId(item.id)}
						/>
					))}
				</div>
			</div>

			<div style={{ flex: 1, background: "#fff" }}>
				{detailQuery.isPending && selectedId && (
					<Center h="100%">
						<Loader color="var(--fb-primary)" />
					</Center>
				)}
				{detail && (
					<FeedbackDetailView
						item={detail}
						mutating={detailMutating}
						onToggleArchive={() =>
							archiveMutation.mutate({
								id: detail.id,
								archived: detail.archivedAt === null,
							})
						}
						onMarkSpam={handleMarkSpam}
					/>
				)}
				{!selectedId && (
					<Center h="100%">
						<div
							style={{
								fontSize: 13,
								color: "rgba(12,10,7,0.5)",
							}}
						>
							Wybierz opinię z listy.
						</div>
					</Center>
				)}
			</div>
		</div>
	);
};

const mergeListRow = (
	row: FeedbackListItem,
	updated: FeedbackDetail,
): FeedbackListItem => ({
	...row,
	readAt: updated.readAt,
	archivedAt: updated.archivedAt,
	spamMarkedAt: updated.spamMarkedAt,
	voucher: updated.voucher
		? {
				code: updated.voucher.code,
				status: updated.voucher.status,
				expiresAt: updated.voucher.expiresAt,
			}
		: row.voucher,
});
