# Opaque QR identity via a `QrCode` entity

Physical QR codes installed at a Venue (etched on table tents, printed on receipts, mounted at entrances) are long-lived, expensive-to-replace assets. To stop the physical QR from coupling to any single product experience, each QR encodes an **opaque server-resolved identifier** rather than a direct URL to the current feedback flow. The server looks up the `QrCode` by ID, finds its Venue, and decides what experience to serve. The MVP serves the feedback page; a future menu integration could serve menu-with-feedback-nudge instead, all without replacing a single sticker in the field.

A Venue has one or more `QrCode` records. The MVP UX exposes a single label-less QR per Venue; multi-QR (per table, per entrance, per kiosk) is a console feature that ships later with no schema change. The `QrCode` also carries an `active` flag, so an Owner can deactivate a stolen, photographed, or rotated QR without disturbing the rest.

## Considered options

- **Embed Venue ID directly in the URL (`/v/<venueId>`)** — rejected. Pivoting the experience later requires either changing the URL pattern (forces physical replacement) or stacking query parameters until the URL becomes unreadable.
- **One QR per Venue with no entity, just a derived URL** — rejected. Same coupling problem, plus no path to per-QR analytics, per-QR cooldown, or QR deactivation.
- **First-class `Table` entity, with QRs bound to Tables** — rejected as premature. A QR can be at a table, but it can also be at a counter, an entrance, on a receipt, or on social media — `QrCode` is the right granularity and `label` covers the table-naming case without forcing it.

## Consequences

- The diner-facing URL is `https://app/q/<qrCodeId>` not `https://app/v/<venueId>`. Marketing and onboarding copy must reference this.
- A nullable `qrCode` FK on `Feedback` and `Voucher` records which QR initiated each submission, enabling per-QR analytics for free.
- The server must perform one lookup per scan to resolve the QrCode to its Venue and current experience — negligible overhead.
