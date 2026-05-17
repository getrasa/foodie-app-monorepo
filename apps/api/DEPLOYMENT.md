# Deployment (Railway)

The API is deployed to Railway as project **`foodie-backend`** (workspace: *Damian Matkowski's Projects*) with two services:

- **`Postgres`** — Postgres 17, managed by Railway
- **`api`** — this NestJS app

The start command runs migrations before booting:

```
npm run migration:up && node dist/main
```

…so every deploy auto-applies pending mikro-orm migrations.

## Redeploy

From `apps/api/`:

```bash
railway up --service api
```

That's it. Railpack reads `railway.toml` for build/start and `.nvmrc` for the Node version (pinned to `22.19.0` — required for `require(esm)` support, see "Gotchas" below).

For non-interactive / CI environments use:

```bash
railway up --service api --ci
```

## Environment variables

Manage from `apps/api/`:

```bash
railway variables                                             # list current
railway variables --set "KEY=value"                           # set one
railway variables --set "KEY=value" --skip-deploys            # set without triggering deploy
railway variables delete KEY                                  # remove
```

Cross-service references use `${{ServiceName.VAR}}` — e.g. `DATABASE_HOST` is set to `${{Postgres.PGHOST}}` and resolves at runtime.

### Currently set

| Var | Source |
|---|---|
| `DATABASE_HOST/PORT/NAME/USER/PASSWORD` | references to `Postgres.PG*` |
| `BETTER_AUTH_SECRET` | random (generated once) |
| `BETTER_AUTH_URL` | the API's own Railway URL |
| `WEB_APP_URL` | the web app's Vercel URL (used by CORS) |
| `NODE_ENV` | `production` |
| `EMAIL_FROM` | `noreply@example.com` (placeholder) |
| `RESEND_KEY` | **placeholder** — replace with a real key before email features are needed |

R2 vars (`R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`) are not set yet — add them when storage features are wired up.

## Database access

```bash
railway connect Postgres     # opens psql on the running Postgres service
railway logs --service api   # tail API logs (build + runtime)
railway logs --service Postgres
```

For ad-hoc one-off queries from local with Railway-injected env vars:

```bash
railway run --service api npm run mikro-orm -- some-command
```

Note: `railway run` executes locally with env vars from Railway, so it can only reach Postgres via the public proxy (`DATABASE_PUBLIC_URL`), not the internal host.

## Migrations

Migrations auto-run on every deploy via the start command. To create a new migration locally:

```bash
npm run migration:create
```

Commit the generated file in `src/database/migrations/`. It will be applied on the next Railway deploy.

To run/roll back manually inside the Railway container:

```bash
railway ssh                  # opens shell on api service
npm run migration:up
npm run migration:down
```

## First-time setup on a new machine

```bash
railway login
cd apps/api
railway link                 # interactive: pick foodie-backend
railway service api          # set api as the active service
```

## Gotchas

- **Node version is pinned to `22.19.0`** via `.nvmrc`. The codebase uses `better-auth` which is ESM-only, but Nest compiles to CommonJS. Node ≥ 22.12 enables `require(esm)` by default, so a CJS `require('better-auth')` works. Older Node 22.x **crashes on boot** with `ERR_REQUIRE_ESM`. Do not lower this version without converting the API to ESM.
- **`railway.toml`'s `startCommand` overrides `package.json`'s `start` script** on Railway. The local `npm start` runs `nest start` (slow dev mode); production goes through the compiled `dist/main`.
- **Migrations on deploy can fail forward.** If `migration:up` fails the container exits and the deploy is marked failed. Fix the migration and redeploy — no partial states.

## Useful

- Dashboard: https://railway.com/project/ed969d72-31e5-499e-a66d-8b790162d3ef
- Service URL: https://api-production-c8b93.up.railway.app
- Tail logs: `railway logs --service api`
- Inspect current deploy: `railway status`
