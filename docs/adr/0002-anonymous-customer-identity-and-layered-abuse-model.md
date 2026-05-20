# Anonymous Customer identity with a layered abuse model

Customers are anonymous by design — there is no `Customer` entity, no login, no required email, no required name. The mission's hard constraint is a sub-60-second feedback flow with no account creation, and any required identity field would break that. Customer data lives inline on `Feedback` as nullable fields.

Abuse prevention uses a defense-in-depth stack of cheap, silent signals: a browser device fingerprint (FingerprintJS), a localStorage UUID written on first scan, the client IP address logged on every submission, and a per-(Venue, fingerprint) cooldown enforced at Voucher issuance using the `dailyCap` on the active `RewardOffer`. No DB-level uniqueness constraint is placed on any customer identifier — fingerprints and IPs are too noisy to constrain at the schema layer. IP is used as a forensic signal and a coarse circuit-breaker at very high request volumes, not a per-request gate, because shared Wi-Fi (a busy venue, a mall, a hotel) routinely produces high legitimate volume from one egress IP.

## Considered options

- **Required email with one-time-code verification** — rejected. Burner email services (10minutemail, mailinator) defeat it cheaply, and the +30s flow time violates the 60-second budget.
- **Required SMS verification** — rejected. Adds real per-message cost, kills the flow, and only marginally raises the abuse bar.
- **A `Customer` entity keyed by fingerprint** — deferred. Buys nothing for MVP and forces an "identity resolution" subproblem (same person, two fingerprints; two people, one device) that we don't need to solve yet.
- **Unique (Venue, email) constraint inherited from the original schema** — rejected. Would lock out repeat customers for life and provided abuse protection only against the most naive case.

## Consequences

- A determined competitor can spam a Venue with 1-star Feedback from a coffee shop using a fresh browser session. This is accepted as the cost of the friction promise. Owners get a `spamMarkedAt` action in the console as a manual escape hatch, which also voids the linked Voucher.
- An optional `customerEmail` field exists on Feedback for "email me my voucher" UX. It plays no role in abuse logic, has no uniqueness constraint, and is never required.
- The Feedback table accumulates raw fingerprint / IP / userAgent data — privacy notice copy on the diner page must reflect this.
