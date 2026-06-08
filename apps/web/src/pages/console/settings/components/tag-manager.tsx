import { Alert, Loader } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { tagApi, type Tag } from "#/lib/api/tag-api";

interface TagManagerProps {
	venueId: string;
}

const TAGS_QUERY_KEY = (venueId: string) => ["tags", venueId] as const;

export const TagManager = ({ venueId }: TagManagerProps) => {
	const queryClient = useQueryClient();
	const tagsQuery = useQuery({
		queryKey: TAGS_QUERY_KEY(venueId),
		queryFn: () => tagApi.listForVenue(venueId),
	});

	const [newLabel, setNewLabel] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editLabel, setEditLabel] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const invalidate = () =>
		queryClient.invalidateQueries({ queryKey: TAGS_QUERY_KEY(venueId) });

	const createMutation = useMutation({
		mutationFn: (label: string) => tagApi.create(venueId, { label }),
		onSuccess: () => {
			setNewLabel("");
			setErrorMessage(null);
			void invalidate();
		},
		onError: (err: Error) => setErrorMessage(err.message),
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, label, sortOrder }: { id: string; label?: string; sortOrder?: number }) =>
			tagApi.update(id, { label, sortOrder }),
		onSuccess: () => {
			setEditingId(null);
			setEditLabel("");
			setErrorMessage(null);
			void invalidate();
		},
		onError: (err: Error) => setErrorMessage(err.message),
	});

	const archiveMutation = useMutation({
		mutationFn: (id: string) => tagApi.archive(id),
		onSuccess: () => {
			setErrorMessage(null);
			void invalidate();
		},
		onError: (err: Error) => setErrorMessage(err.message),
	});

	const tags = tagsQuery.data ?? [];

	const move = (tag: Tag, direction: "up" | "down") => {
		const siblings = [...tags].sort((a, b) => a.sortOrder - b.sortOrder);
		const idx = siblings.findIndex((t) => t.id === tag.id);
		const swapWith =
			direction === "up" ? siblings[idx - 1] : siblings[idx + 1];
		if (!swapWith) return;
		updateMutation.mutate({ id: tag.id, sortOrder: swapWith.sortOrder });
		updateMutation.mutate({ id: swapWith.id, sortOrder: tag.sortOrder });
	};

	const startEdit = (tag: Tag) => {
		setEditingId(tag.id);
		setEditLabel(tag.label);
		setErrorMessage(null);
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditLabel("");
	};

	const saveEdit = (tag: Tag) => {
		const trimmed = editLabel.trim();
		if (!trimmed || trimmed === tag.label) {
			cancelEdit();
			return;
		}
		updateMutation.mutate({ id: tag.id, label: trimmed });
	};

	const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const trimmed = newLabel.trim();
		if (!trimmed) return;
		createMutation.mutate(trimmed);
	};

	if (tagsQuery.isPending) {
		return (
			<div style={{ display: "flex", justifyContent: "center", padding: 16 }}>
				<Loader color="var(--fb-primary)" size="sm" />
			</div>
		);
	}

	const sorted = [...tags].sort((a, b) => a.sortOrder - b.sortOrder);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
			{errorMessage && (
				<Alert color="red" variant="light" onClose={() => setErrorMessage(null)} withCloseButton>
					{errorMessage}
				</Alert>
			)}

			{sorted.length === 0 ? (
				<div
					style={{
						padding: "16px 18px",
						background: "var(--fb-cream)",
						borderRadius: 12,
						fontSize: 13,
						color: "rgba(31,26,21,0.65)",
						lineHeight: 1.5,
					}}
				>
					Tagi pomagają gościom zostawić uporządkowaną opinię bez pisania.
					Są opcjonalne — możesz je dodać teraz albo później.
				</div>
			) : (
				<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
					{sorted.map((tag, idx) => {
						const isEditing = editingId === tag.id;
						return (
							<div
								key={tag.id}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 10,
									padding: "10px 12px",
									background: "#fff",
									border: "0.5px solid rgba(31,26,21,0.1)",
									borderRadius: 10,
								}}
							>
								<div style={{ display: "flex", flexDirection: "column" }}>
									<button
										type="button"
										aria-label="W górę"
										disabled={idx === 0 || updateMutation.isPending}
										onClick={() => move(tag, "up")}
										style={moveButtonStyle(idx === 0 || updateMutation.isPending)}
									>
										<ArrowUp size={12} />
									</button>
									<button
										type="button"
										aria-label="W dół"
										disabled={
											idx === sorted.length - 1 || updateMutation.isPending
										}
										onClick={() => move(tag, "down")}
										style={moveButtonStyle(
											idx === sorted.length - 1 || updateMutation.isPending,
										)}
									>
										<ArrowDown size={12} />
									</button>
								</div>

								<div style={{ flex: 1 }}>
									{isEditing ? (
										<input
											value={editLabel}
											onChange={(e) => setEditLabel(e.target.value)}
											autoFocus
											maxLength={64}
											onKeyDown={(e) => {
												if (e.key === "Enter") saveEdit(tag);
												if (e.key === "Escape") cancelEdit();
											}}
											style={{
												width: "100%",
												padding: "6px 8px",
												borderRadius: 6,
												border: "1px solid rgba(31,26,21,0.2)",
												fontFamily: "var(--fb-sans)",
												fontSize: 14,
												outline: "none",
											}}
										/>
									) : (
										<span
											style={{
												fontFamily: "var(--fb-sans)",
												fontSize: 14,
												color: "var(--fb-ink)",
											}}
										>
											{tag.label}
										</span>
									)}
								</div>

								{isEditing ? (
									<>
										<button
											type="button"
											aria-label="Zapisz"
											onClick={() => saveEdit(tag)}
											disabled={updateMutation.isPending}
											style={iconButtonStyle("var(--fb-olive)")}
										>
											<Check size={14} />
										</button>
										<button
											type="button"
											aria-label="Anuluj"
											onClick={cancelEdit}
											style={iconButtonStyle()}
										>
											<X size={14} />
										</button>
									</>
								) : (
									<>
										<button
											type="button"
											aria-label="Edytuj"
											onClick={() => startEdit(tag)}
											style={iconButtonStyle()}
										>
											<Pencil size={14} />
										</button>
										<button
											type="button"
											aria-label="Archiwizuj"
											onClick={() => {
												if (
													window.confirm(
														`Zarchiwizować tag „${tag.label}"? Historyczne opinie będą nadal go pokazywać.`,
													)
												) {
													archiveMutation.mutate(tag.id);
												}
											}}
											disabled={archiveMutation.isPending}
											style={iconButtonStyle("var(--fb-primary)")}
										>
											<Trash2 size={14} />
										</button>
									</>
								)}
							</div>
						);
					})}
				</div>
			)}

			<form
				onSubmit={handleCreate}
				style={{
					display: "flex",
					gap: 8,
					alignItems: "center",
					marginTop: 4,
				}}
			>
				<input
					value={newLabel}
					onChange={(e) => setNewLabel(e.target.value)}
					placeholder="Dodaj nowy tag (np. Obsługa)"
					maxLength={64}
					style={{
						flex: 1,
						padding: "10px 12px",
						borderRadius: 10,
						border: "1px solid rgba(31,26,21,0.12)",
						fontFamily: "var(--fb-sans)",
						fontSize: 14,
						color: "var(--fb-ink)",
						outline: "none",
					}}
				/>
				<button
					type="submit"
					disabled={!newLabel.trim() || createMutation.isPending}
					style={{
						padding: "10px 18px",
						borderRadius: 10,
						background: "var(--fb-ink)",
						color: "var(--fb-cream)",
						border: "none",
						cursor:
							!newLabel.trim() || createMutation.isPending
								? "not-allowed"
								: "pointer",
						opacity: !newLabel.trim() || createMutation.isPending ? 0.5 : 1,
						fontSize: 13,
						fontFamily: "var(--fb-sans)",
						fontWeight: 500,
					}}
				>
					{createMutation.isPending ? "Dodaję…" : "Dodaj"}
				</button>
			</form>
		</div>
	);
};

const iconButtonStyle = (color = "var(--fb-ink)"): React.CSSProperties => ({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: 28,
	height: 28,
	borderRadius: 8,
	background: "transparent",
	border: "0.5px solid rgba(31,26,21,0.12)",
	cursor: "pointer",
	color,
});

const moveButtonStyle = (disabled: boolean): React.CSSProperties => ({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: 18,
	height: 14,
	background: "transparent",
	border: "none",
	cursor: disabled ? "not-allowed" : "pointer",
	color: disabled ? "rgba(31,26,21,0.25)" : "rgba(31,26,21,0.55)",
	padding: 0,
});
