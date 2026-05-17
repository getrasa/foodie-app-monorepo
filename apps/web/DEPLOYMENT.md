# Deployment (Vercel)

The web app is deployed to Vercel as project **`foodie-web`** (org: `getrasas-projects`).

Builds are done **locally** and uploaded as a prebuilt artifact — this sidesteps monorepo install quirks on Vercel's build infra.

## Redeploy

From `apps/web/`:

```bash
vercel build --prod
vercel deploy --prebuilt --prod
```

That's it. The first command produces `.vercel/output/` (Nitro auto-selects the `vercel` preset because `VERCEL=1` is set during `vercel build`). The second uploads it.

For a preview deploy (non-prod URL), drop `--prod`:

```bash
vercel build
vercel deploy --prebuilt
```

## Environment variables

Manage prod env vars via:

```bash
vercel env ls                          # list
vercel env add VAR_NAME production     # add
vercel env rm VAR_NAME production      # remove
```

After changing env vars, redeploy for them to take effect.

Pull a local copy of remote env values into `apps/web/.vercel/`:

```bash
vercel pull --environment=production
```

## First-time setup on a new machine

```bash
vercel login
cd apps/web
vercel link --project foodie-web --yes
```

## Useful

- Dashboard: https://vercel.com/getrasas-projects/foodie-web
- Inspect latest: `vercel inspect --logs`
- Node version: pinned to `22.x` in project settings (Vercel does not yet accept `24.x`)
