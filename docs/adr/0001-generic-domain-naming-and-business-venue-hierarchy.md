# Domain-generic naming and a Business → Venue hierarchy

The product's first UI is restaurant-shaped, but the underlying mechanic — scan QR, leave Feedback, get a Voucher — applies just as well to gyms, cinemas, salons, and other physical-presence businesses. We chose vertical-neutral terms for every entity and FK in the domain: `Venue` (not `Restaurant`), `Customer` (not `Diner`), `RewardOffer` (not `DiscountConfig`), `Voucher` (not `DiscountCode`), `Business` for the parent commercial entity. Vertical-specific vocabulary lives only in the UI layer (e.g., "Restauracja", "Gość", "Rabat" in the Polish restaurant UI).

We also introduced a `Business` parent above `Venue` even though the MVP ships single-venue: a 1:N from Business to Venue lets us model chains and groups later without a migration, and the MVP simply auto-creates one Business with one Venue at signup, hidden from the UI.

## Considered options

- **Keep restaurant-shaped names (`Restaurant`, `Diner`, `Discount`)** — rejected because renaming entities later touches every layer (schema, ORM, API, types, tests) and creates a long tail of half-renamed code.
- **Use `Store` as the generic** — rejected: "store" maps to retail in everyday English, doesn't fit gym/cinema, and collides with the software-meaning of "store" (state store, datastore, app store) in a TanStack/React codebase.
- **Single-tier model with `Venue` directly under `User`** — rejected because real customers with multiple locations would force us to retrofit a parent entity later.

## Consequences

- The Polish restaurant UI uses vertical-specific copy while the domain stays generic; this split is deliberate and must be preserved when adding new verticals.
- A small amount of MVP code (signup flow, dashboard) must hide the Business layer until a "second venue" feature ships.
