# Entity Model — Owner Console (MVP)

The data model behind the FeedbackBite Owner Console. Domain terms are defined in [`CONTEXT.md`](../CONTEXT.md); the *why* behind the modeling choices is in [`docs/adr/`](./adr/). This file is the **what** — column-level reference for implementation.

The model is one bounded context split into four NestJS modules: `auth/`, `venue/`, `feedback/`, `voucher/`.

## Tree

```
auth/
└── User                              (existing, better-auth — unchanged)

venue/
├── Business                          1 User → 1..N Businesses
│   ├── id
│   ├── owner                         FK → User
│   ├── name                          brand-level
│   ├── logo                          nullable
│   ├── onboardingCompletedAt         nullable — set when wizard finished
│   ├── archivedAt                    nullable — soft delete
│   ├── createdAt
│   └── updatedAt
│
├── Venue                             1 Business → 1..N Venues
│   ├── id
│   ├── business                      FK
│   ├── name                          location-level (e.g. "Lucia Mokotów")
│   ├── address                       nullable
│   ├── googlePlaceId                 nullable
│   ├── googleMapsUrl                 nullable — derivable; cached
│   ├── archivedAt                    nullable — soft delete
│   ├── createdAt
│   └── updatedAt
│
├── RewardOffer                       1:1 with Venue, mutable in place
│   ├── id
│   ├── venue                         FK, unique
│   ├── type                          PERCENTAGE | FIXED_AMOUNT | FREE_ITEM
│   ├── value                         string — interpretation per type
│   ├── expiresInDays                 voucher TTL at issuance
│   ├── dailyCap                      nullable — abuse limit per fingerprint/day
│   ├── active                        boolean — pause without delete
│   ├── createdAt
│   └── updatedAt
│
├── QrCode                            1 Venue → 1..N QrCodes
│   ├── id                            opaque (e.g. "qrc_a8f3b2c1")
│   ├── venue                         FK
│   ├── label                         nullable — "Bar", "Table 7", etc.
│   ├── active                        boolean — owner can deactivate
│   └── createdAt
│
└── Tag                               1 Venue → 0..N Tags
    ├── id
    ├── venue                         FK
    ├── label
    ├── sortOrder
    ├── archivedAt                    nullable — soft delete; preserves history
    └── createdAt

feedback/
├── Feedback
│   ├── id
│   ├── venue                         FK
│   ├── qrCode                        FK, nullable — which QR initiated the scan
│   ├── rating                        1..5, required
│   ├── comment                       nullable
│   │
│   │  -- customer identity (anonymous; see ADR-0002) --
│   ├── customerEmail                 nullable — for "email me the voucher" UX only
│   ├── deviceFingerprint             system-captured
│   ├── localStorageToken             system-captured
│   ├── ipAddress                     system-captured
│   ├── userAgent                     system-captured
│   │
│   │  -- owner state on this feedback --
│   ├── readAt                        nullable — owner has opened it
│   ├── spamMarkedAt                  nullable — owner flagged abuse → voids voucher
│   ├── archivedAt                    nullable — owner dismissed it
│   │
│   └── createdAt
│
└── FeedbackTag                       M:N join
    ├── feedback                      FK    } composite PK
    └── tag                           FK    }

voucher/
└── Voucher                           1:1 with Feedback (Feedback may have none)
    ├── id
    ├── code                          unique, customer-facing redemption string
    ├── venue                         FK
    ├── feedback                      FK, unique (the issuing event)
    ├── qrCode                        FK, nullable (which QR initiated it)
    │
    │  -- snapshot of RewardOffer terms at issuance (see ADR-0003) --
    ├── type                          RewardType enum
    ├── value                         string
    ├── description                   human-readable, snapshot
    │
    │  -- lifecycle --
    ├── status                        active | redeemed | expired | voided
    ├── expiresAt
    ├── redeemedAt                    nullable
    ├── voidedAt                      nullable
    └── createdAt
```

## Cross-module relationships

- `feedback/` reads `Venue`, `QrCode`, `Tag`, and the live `RewardOffer` from `venue/` to validate submissions and decide whether to issue a Voucher.
- `voucher/` is created during Feedback submission, snapshotting `RewardOffer` terms onto itself. After issuance, the redemption flow operates on `voucher/` alone — no joins to `venue/` are required for redemption.
- `auth/` is referenced only as `User` IDs from `Business.owner`. No other module reaches into `auth/`.

Direct imports across modules are permitted in MVP (see session notes on loose module boundaries). Tightening to ports/events is a future concern.

## What's not modeled (intentionally)

- **`Customer` entity** — anonymous-by-design; customer fields live inline on `Feedback`. See ADR-0002.
- **`Table` entity** — `QrCode.label` covers per-table naming without forcing a Table abstraction. See ADR-0004.
- **`RewardOffer` history / version table** — `Voucher` snapshots terms; the offer mutates in place. See ADR-0003.
- **Staff sub-accounts** — out of MVP scope; the Owner is the only role.
- **Per-Venue or per-Business membership join** — a `User` owns a `Business` directly via 1:N. Multi-owner Businesses are a future feature.

## Migration notes from existing schema

| Existing | New | Notes |
|---|---|---|
| `Restaurant` | `Venue` | renamed; `ownerId` becomes `business` FK via a new `Business` row created during migration |
| `DiscountConfig` | `RewardOffer` | renamed; existing fields preserved |
| `DiscountCode` | `Voucher` | renamed; gains `type`, `value` columns (backfill from linked RewardOffer); gains `voidedAt`, `qrCode` FK |
| `Review` | `Feedback` | renamed; **drop** `reviewerName` and the unique `(restaurant, reviewerEmail)` constraint; `reviewerEmail` becomes nullable `customerEmail`; gains `localStorageToken`, `userAgent`, `readAt`, `spamMarkedAt`, `archivedAt`, `qrCode` FK |
| *(new)* | `Business` | one row per existing Restaurant.owner during migration |
| *(new)* | `QrCode` | one row per existing Restaurant; opaque ID generated |
| *(new)* | `Tag`, `FeedbackTag` | empty at migration time |
