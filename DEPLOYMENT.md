# Vercel Deployment

This repository deploys the Vite app in `Miss Mrs Maharashtra website from zip`.

## Vercel Settings

- Framework preset: `Vite`
- Install command: `cd "Miss Mrs Maharashtra website from zip" && npm ci`
- Build command: `cd "Miss Mrs Maharashtra website from zip" && npm run build`
- Output directory: `Miss Mrs Maharashtra website from zip/dist`

These settings are also captured in `vercel.json`, so deploying from the repository root should work without moving the app folder.

## Deploy

```bash
vercel
```

For production:

```bash
vercel --prod
```

If using Git integration, connect the repository in Vercel and keep the root directory as the repository root.
