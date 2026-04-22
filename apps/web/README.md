# FeedbackBite - Web

FeedbackBite helps restaurant owners collect genuine customer feedback by rewarding diners with instant discount codes — while organically encouraging Google Maps reviews without violating any platform policies.

## How It Works

Restaurant owners place a QR code on tables, receipts, or walls. Diners scan it, land on a quick feedback page, leave a star rating and optional comment, and instantly receive a discount code for their next visit. After receiving their discount, they see a gentle, optional nudge to share their experience on Google Maps. The discount is tied to feedback on our platform — never to the Google review — keeping everything policy-compliant.

**For diners**: No app download. No account. No login. Scan, tap, done — under 60 seconds.

**For owners**: Sign up, configure a discount offer, download a QR code, and start collecting feedback from a simple dashboard.

## Tech Stack

- [TanStack Start](https://tanstack.com/start) - Full-stack React meta-framework
- [TanStack Router](https://tanstack.com/router) - File-based routing
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [Mantine](https://mantine.dev/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Better Auth](https://www.better-auth.com/) - Authentication
- [Biome](https://biomejs.dev/) - Linting & formatting
- [Vitest](https://vitest.dev/) - Testing

## Getting Started

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:3000`.

## Project Structure

```
src/
├── routes/                    # File-based routes (TanStack Router)
│   ├── __root.tsx             # Root layout (Mantine + QueryClient providers)
│   ├── index.tsx              # Home page
│   ├── store/$id/review.tsx   # Store review route
│   └── api/auth/$.ts          # Auth API handler
├── pages/                     # Page components (.page.tsx)
│   └── store-review/
│       ├── store-review.page.tsx
│       └── components/
│           ├── review-form.tsx
│           ├── google-maps-prompt.tsx
│           └── discount-result.tsx
├── lib/                       # Shared utilities
│   ├── auth.ts                # Better Auth server config
│   ├── auth-client.ts         # Better Auth client
│   └── query-client.ts        # TanStack Query client
└── integrations/              # Third-party integrations
```

Route files in `src/routes/` are thin definitions that import page components from `src/pages/`.

## Review Flow

1. User scans QR code which opens `/store/{id}/review`
2. User fills out the review form (star rating, review text, name, email)
3. **5 stars**: Prompted to leave a Google Maps review, then shown a discount code
4. **< 5 stars**: Shown a discount code directly

## Scripts

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm start      # Run production build
pnpm test       # Run tests
pnpm lint       # Lint code
pnpm format     # Format code
pnpm check      # Lint + format check
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```bash
BETTER_AUTH_SECRET=   # Generate with: npx -y @better-auth/cli secret
```
