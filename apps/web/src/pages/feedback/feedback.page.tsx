import { useEffect, useState } from "react";
import { ApiError } from "#/lib/api-client";
import {
	resolveQrCode,
	submitFeedback,
	type FeedbackSubmissionResult,
	type ResolvedQrCode,
} from "#/lib/api/feedback-api";
import { useCustomerIdentity } from "#/lib/feedback/use-customer-identity";
import { ScreenComment } from "./components/screen-comment";
import { ScreenGoogleMaps } from "./components/screen-google-maps";
import { ScreenLanding } from "./components/screen-landing";
import { ScreenRating } from "./components/screen-rating";
import { ScreenResult } from "./components/screen-result";
import { ScreenStatus } from "./components/screen-status";

type Phase = "landing" | "rating" | "comment" | "google_maps" | "result";
type ResolveState =
	| { status: "loading" }
	| { status: "ok"; data: ResolvedQrCode }
	| { status: "gone" }
	| { status: "error"; message: string };

interface FeedbackPageProps {
	qrCodeId: string;
}

const messageFromError = (err: unknown): string => {
	if (err instanceof ApiError) {
		if (err.status === 429) {
			return "Zbyt wiele prób z tej sieci — spróbuj ponownie za chwilę.";
		}
		return err.message;
	}
	return "Coś poszło nie tak. Spróbuj jeszcze raz.";
};

export const FeedbackPage = ({ qrCodeId }: FeedbackPageProps) => {
	const [resolveState, setResolveState] = useState<ResolveState>({
		status: "loading",
	});
	const [phase, setPhase] = useState<Phase>("landing");
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [email, setEmail] = useState("");
	const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [result, setResult] = useState<FeedbackSubmissionResult | null>(null);
	const [emailedTo, setEmailedTo] = useState("");

	const identity = useCustomerIdentity();

	useEffect(() => {
		const controller = new AbortController();
		setResolveState({ status: "loading" });
		resolveQrCode(qrCodeId, controller.signal)
			.then((data) => {
				setResolveState({ status: "ok", data });
			})
			.catch((err) => {
				if (controller.signal.aborted) return;
				if (err instanceof ApiError && (err.status === 404 || err.status === 410)) {
					setResolveState({ status: "gone" });
					return;
				}
				setResolveState({
					status: "error",
					message: messageFromError(err),
				});
			});
		return () => controller.abort();
	}, [qrCodeId]);

	const handleSubmit = async () => {
		if (resolveState.status !== "ok" || rating < 1) return;
		setSubmitting(true);
		setSubmitError(null);
		try {
			const submission = await submitFeedback(qrCodeId, {
				rating,
				comment: comment.trim() || null,
				customerEmail: email.trim() || null,
				tagIds: selectedTagIds.length > 0 ? selectedTagIds : undefined,
				deviceFingerprint: identity.deviceFingerprint,
				localStorageToken: identity.localStorageToken,
			});
			setResult(submission);
			setEmailedTo(email.trim());
			// A 5-star Maps nudge is the only step we slot in front of the
			// voucher reveal — every other rating goes straight to the result.
			const shouldNudge =
				rating === 5 && Boolean(resolveState.data.venue.googleMapsUrl);
			setPhase(shouldNudge ? "google_maps" : "result");
		} catch (err) {
			setSubmitError(messageFromError(err));
		} finally {
			setSubmitting(false);
		}
	};

	const shellStyle = {
		minHeight: "100vh",
		maxWidth: 430,
		margin: "0 auto",
		background: "var(--fb-cream)",
		fontFamily: "var(--fb-sans)",
		display: "flex" as const,
		flexDirection: "column" as const,
	};

	if (resolveState.status === "loading") {
		return (
			<div style={shellStyle}>
				<ScreenStatus heading="Łączenie…" body="Sekunda, otwieram formularz." />
			</div>
		);
	}
	if (resolveState.status === "gone") {
		return (
			<div style={shellStyle}>
				<ScreenStatus
					heading="Ten kod jest już nieaktywny"
					body="Lokal mógł zmienić kod QR lub tymczasowo zawiesić ten punkt. Spróbuj zeskanować inny kod na miejscu."
				/>
			</div>
		);
	}
	if (resolveState.status === "error") {
		return (
			<div style={shellStyle}>
				<ScreenStatus
					heading="Coś poszło nie tak"
					body={`${resolveState.message} Odśwież stronę za chwilę.`}
				/>
			</div>
		);
	}

	const { data } = resolveState;

	const renderPhase = () => {
		switch (phase) {
			case "landing":
				return (
					<ScreenLanding
						venueName={data.venue.name}
						rewardDescription={
							data.rewardOffer?.active ? data.rewardOffer.description : null
						}
						onStart={() => setPhase("rating")}
					/>
				);
			case "rating":
				return (
					<ScreenRating
						rating={rating}
						setRating={setRating}
						onNext={() => setPhase("comment")}
						onBack={() => setPhase("landing")}
					/>
				);
			case "comment":
				return (
					<ScreenComment
						rating={rating}
						comment={comment}
						setComment={setComment}
						email={email}
						setEmail={setEmail}
						tags={data.tags}
						selectedTagIds={selectedTagIds}
						toggleTag={(id) =>
							setSelectedTagIds((prev) =>
								prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
							)
						}
						onSubmit={handleSubmit}
						onBack={() => setPhase("rating")}
						submitting={submitting}
						submitError={submitError}
					/>
				);
			case "google_maps":
				return data.venue.googleMapsUrl ? (
					<ScreenGoogleMaps
						venueName={data.venue.name}
						googleMapsUrl={data.venue.googleMapsUrl}
						comment={comment}
						onContinue={() => setPhase("result")}
					/>
				) : null;
			case "result":
				return result ? (
					<ScreenResult
						venue={data.venue}
						result={result}
						emailedTo={emailedTo}
					/>
				) : null;
		}
	};

	return <div style={shellStyle}>{renderPhase()}</div>;
};
