# Voucher self-containment via snapshot of RewardOffer terms

A `Voucher` is immutable to changes the Owner makes to their `RewardOffer` after issuance. To enforce this, the Voucher **snapshots** the offer's `type`, `value`, and human-readable `description` into its own columns at creation time, and does **not** carry a foreign key to `RewardOffer`. The RewardOffer itself stays mutable with no history table — an Owner can change value, type, or expiry window in place, and only future Vouchers are affected.

A Voucher issued under "15% off" remains "15% off" even if the offer becomes "20% off" the next day, because the terms live on the Voucher row, not behind a join. Redemption logic at the cashier console reads everything it needs directly from the Voucher.

## Considered options

- **FK from Voucher to RewardOffer, no snapshot** — rejected. Mutating the offer would retroactively change the terms of already-issued Vouchers, which is wrong commercially, legally, and ethically.
- **Immutable RewardOffer rows with versioning (event-sourced flavor)** — rejected as too heavy. Every offer edit would create a new row and Voucher would FK to a version. Correct, but the snapshot approach achieves the same guarantee with one fewer table and zero join cost.
- **Snapshot only the description string** (the original `discountDescription` field) — rejected as incomplete. Redemption needs the structured `type` and `value` to render the cashier UI and validate the voucher.

## Consequences

- Analytics queries on issued Vouchers ("how many free-dessert vouchers in May?") don't need to join offer-history tables; the data is on the Voucher row.
- If an Owner ever wants to retroactively change a Voucher's terms, the path is `voidedAt` the old Voucher and issue a new one — not "edit it."
- Schema migration from the existing `DiscountCode` model: add `type` and `value` columns to Voucher, backfill from the linked RewardOffer.
