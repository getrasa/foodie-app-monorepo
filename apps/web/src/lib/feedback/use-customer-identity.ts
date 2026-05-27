import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

// Customer identity is anonymous-by-design (ADR-0002): no account, no login.
// We capture two lightweight, silent signals on the client and forward both
// as request headers so the API can apply per-venue cooldowns. Neither value
// uniquely identifies a person — they are abuse signals, not identifiers.

const LOCAL_STORAGE_KEY = "fb.customerToken";

export interface CustomerIdentity {
	deviceFingerprint: string | null;
	localStorageToken: string | null;
	ready: boolean;
}

const readToken = (): string | null => {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage.getItem(LOCAL_STORAGE_KEY);
	} catch {
		return null;
	}
};

const writeToken = (value: string): void => {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(LOCAL_STORAGE_KEY, value);
	} catch {
		// localStorage disabled (private mode, quota) — token simply won't persist.
	}
};

const ensureToken = (): string => {
	const existing = readToken();
	if (existing) return existing;
	const generated =
		typeof crypto !== "undefined" && "randomUUID" in crypto
			? crypto.randomUUID()
			: `${Date.now()}-${Math.random().toString(36).slice(2)}`;
	writeToken(generated);
	return generated;
};

let fingerprintPromise: Promise<string> | null = null;

const loadFingerprint = (): Promise<string> => {
	if (!fingerprintPromise) {
		fingerprintPromise = FingerprintJS.load()
			.then((agent) => agent.get())
			.then((result) => result.visitorId);
	}
	return fingerprintPromise;
};

export const useCustomerIdentity = (): CustomerIdentity => {
	// The localStorage token is allocated synchronously on first render so the
	// per-device cap has a working signal even if the diner submits before
	// FingerprintJS has finished computing. SSR returns null here; the first
	// client render upgrades the value before any submission can fire.
	const [identity, setIdentity] = useState<CustomerIdentity>(() => ({
		deviceFingerprint: null,
		localStorageToken: typeof window === "undefined" ? null : ensureToken(),
		ready: false,
	}));

	useEffect(() => {
		let cancelled = false;
		const token = identity.localStorageToken ?? ensureToken();
		if (!identity.localStorageToken) {
			setIdentity((prev) => ({ ...prev, localStorageToken: token }));
		}
		loadFingerprint()
			.then((deviceFingerprint) => {
				if (cancelled) return;
				setIdentity({ deviceFingerprint, localStorageToken: token, ready: true });
			})
			.catch(() => {
				if (cancelled) return;
				// Fingerprinting failures must not block submission — the localStorage
				// token alone still anchors the per-device cap; IP signals carry the rest.
				setIdentity({ deviceFingerprint: null, localStorageToken: token, ready: true });
			});
		return () => {
			cancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return identity;
};
