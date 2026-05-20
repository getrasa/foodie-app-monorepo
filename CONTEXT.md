# FeedbackBite — Domain Glossary

The product helps restaurant owners collect on-platform **Feedback** in exchange for a discount, and separately suggests (never incentivizes) a Google **Review**. Keeping these two words distinct is a load-bearing policy decision.

## Terms

### Feedback
A first-party submission made by a diner on our platform: a star rating (1–5) plus an optional comment. Collecting Feedback is what earns the diner a discount. Feedback lives in our database and is shown to the restaurant owner in the console.

Not to be confused with **Review** (below). The code, database, and UI should consistently say "Feedback" when referring to the on-platform submission — never "Review".

### Review
A third-party rating left on Google Maps. We do not store Reviews and we never reward a diner for posting one. After Feedback is submitted, we *suggest* — softly and optionally — that the diner also leave a Review. The word "Review" in our code should appear only in the narrow context of the Google Maps nudge.

The split between Feedback and Review is a compliance boundary: tying a reward to Feedback is allowed; tying it to a Review would violate Google's policy.

### Business
The top-level commercial entity that an Owner runs. Owns one or more Venues. Holds brand-level attributes like name and logo. A single-location operator still has a Business — it just contains exactly one Venue.

The Business layer exists so the domain works for chains and groups without rework. The MVP UI hides it: signup auto-creates one Business with one Venue.

A Business carries an **onboarding completion timestamp** that marks when the Owner first finished the setup wizard. Until set, the Business is considered "in onboarding" — the resume step is derived from which child entities (Venue, RewardOffer, QrCode) already exist.

A Business is **soft-deleted via an archive timestamp**, not hard-deleted. An archived Business cannot be logged into and its Venues become unreachable, but its history is preserved.

### Venue
A physical location where Customers show up and find a QR code. Each Venue has its own address, its own Google Place ID, its own RewardOffer, and its own Feedback stream. A gym, a restaurant, a cinema, and a salon are all Venues from the domain's perspective; vertical-specific vocabulary lives only in the UI layer.

A Venue is **soft-deleted via an archive timestamp**. An archived Venue stops issuing new Vouchers and its QrCodes return a "no longer active" response, but its Feedback history remains visible to the Owner and already-issued Vouchers remain redeemable until their own expiry. A Venue does not carry a separate "paused" state — temporary pauses live on the RewardOffer's `active` flag.

### Owner
The User who runs a Business. For MVP this is a 1:1 role — one Owner per Business — though the model allows a User to own multiple Businesses. "Owner" describes the role a User plays toward a Business, not a separate entity.

### Customer
The person who scans a QR code at a Venue and submits Feedback. Anonymous by design — no account, no login. Receives a Voucher in exchange for Feedback.

Vertical-specific UI words ("diner", "guest", "member", "patron") map to Customer at the domain level.

### RewardOffer
The configured promise an Owner makes at a Venue: "submit feedback here and you get X." X may be a percentage discount, a fixed-amount discount, or a free item. The RewardOffer is the *template*; it does not represent any single issued reward.

Lives on the Venue, not the Business — different Venues of the same Business can run different offers.

The RewardOffer is mutable: an Owner can change its type, value, expiry window, or pause it at any time. There is no history table — past offer terms are recovered from the Vouchers themselves (see Voucher).

### Voucher
An issued, customer-specific instance of a RewardOffer. Created when a Customer submits Feedback — though not every Feedback produces a Voucher (paused offer, daily cap reached, abuse-flagged submission). Carries a redemption code, an expiry date, a back-reference to the Feedback that earned it, an optional back-reference to the QrCode that initiated the scan, and a lifecycle state. Redeemable only at the issuing Venue.

The word "Voucher" replaces the looser "discount code" because the entity is an entitlement, not a string — the code is just one of its fields.

A Voucher **snapshots the RewardOffer terms at issuance** — type, value, human-readable description — and does not reference the RewardOffer by FK. This keeps the entitlement immutable to later changes the Owner makes to their offer. A Voucher issued under "15% off" remains "15% off" even if the offer becomes "20% off" the next day.

Voucher states:
- **active** — issued and not yet redeemed or expired; the only redeemable state
- **redeemed** — the Owner (or their cashier) has accepted it; terminal
- **expired** — the validity window passed without redemption; terminal
- **voided** — the Owner invalidated it after issuance (e.g. the underlying Feedback was marked as spam); terminal

### QrCode
A physical scannable identifier installed at a Venue. Each QrCode has its own opaque identity, independent of what experience the server serves when scanned. This separation exists so the physical QR is a long-lived asset: a Venue can change which experience a QR resolves to (feedback today, menu+feedback tomorrow) without re-manufacturing or re-installing it.

A Venue has one or more QrCodes. Each QrCode optionally carries a human-readable label ("Bar", "Table 7", "Entrance"). The MVP exposes a single label-less QrCode per Venue; multi-QR is a console feature that can ship later without any model change.

A QrCode can be deactivated by the Owner (lost, stolen, or rotated). Deactivation stops it from issuing further Vouchers but preserves historical Feedback tied to it.

### Tag
A short, owner-defined label that a Customer can attach to their Feedback in lieu of (or alongside) a comment. Owner-managed per Venue, optional both for the Owner (they may define none) and for the Customer (they may select none).

Tags exist to reduce friction for Customers who want to leave structured feedback without typing — especially for low-rating Feedback, where actionable improvement signal is most valuable. When a Venue has no Tags, the Tag chooser does not appear in the diner UI.

Tags are soft-deleted: an archived Tag stops appearing in the Customer UI but stays referenced from historical Feedback.
