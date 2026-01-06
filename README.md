# Cloudflare Workers React Template

[cloudflarebutton]

A production-ready full-stack boilerplate for Cloudflare Workers with React, Vite, Tailwind CSS, shadcn/ui, and TanStack Query. Build modern web apps with serverless APIs, static asset serving, and a responsive UI out of the box.

## Features

- **Full-Stack Ready**: React frontend bundled as static assets served by Cloudflare Workers, with Hono-powered API routes.
- **Modern UI**: shadcn/ui components, Tailwind CSS with custom design system, dark mode support.
- **Developer Experience**: Hot reload with Vite, TypeScript, ESLint, Prettier.
- **State Management**: TanStack Query for data fetching, Zustand/Immer ready.
- **Responsive Design**: Mobile-first, sidebar layout, animations.
- **Error Handling**: Global error boundaries, client/server error reporting.
- **Deployment**: One-command deploy to Cloudflare Workers with Wrangler.
- **Performance**: Optimized builds, code splitting, lazy loading.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Lucide React icons, Framer Motion.
- **Backend**: Cloudflare Workers, Hono, TypeScript.
- **Data**: TanStack Query, Zod validation.
- **UI Utils**: class-variance-authority, clsx, tailwind-merge.
- **Tools**: Bun (package manager), Wrangler (deployment), ESLint.

## Quick Start

1. **Clone the repo** and navigate to the project directory.
2. **Install dependencies**:
   ```bash
   bun install
   ```
3. **Run development server**:
   ```bash
   bun dev
   ```
   Access at `http://localhost:3000` (or your configured PORT).
4. **Build for production**:
   ```bash
   bun build
   ```
5. **Deploy** (see Deployment section).

## Installation

Ensure you have [Bun](https://bun.sh/) and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install/) installed.

```bash
# Install dependencies
bun install

# Generate Worker types (if needed)
bun cf-typegen
```

## Development

- **Frontend Dev**: `bun dev` – serves on `:3000`, proxies `/api/*` to Worker.
- **API Routes**: Add routes in `worker/userRoutes.ts`. Hot-reloads in dev.
- **Custom UI**: Edit `src/pages/HomePage.tsx`, use shadcn/ui components.
- **Theme**: Toggle dark/light mode with `ThemeToggle`.
- **Linting**: `bun lint`.
- **TypeScript**: Full type safety with paths mapped (`@/*`, `@shared/*`).

Customize the sidebar in `src/components/app-sidebar.tsx` or use `AppLayout` from `src/components/layout/AppLayout.tsx`.

## Building

```bash
bun build
```

Outputs optimized static assets to `dist/`, ready for Worker deployment.

## Deployment

Deploy to Cloudflare Workers with a single command:

1. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```
2. **Configure `wrangler.jsonc`** (edit bindings/secrets as needed).
3. **Deploy**:
   ```bash
   bun deploy
   ```

Your app will be live at `https://<worker-name>.<subdomain>.workers.dev`.

[cloudflarebutton]

### Custom Domain

```bash
wrangler deploy --var CUSTOM_DOMAIN:your-domain.com
```

Update `wrangler.jsonc` for bindings (KV, D1, R2, DOs).

## Project Structure

```
├── src/              # React app (pages, components, hooks)
├── worker/           # Cloudflare Worker (API routes)
├── shared/           # Shared TS types (create if needed)
├── tailwind.config.js # Design system
└── wrangler.jsonc    # Worker config
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server |
| `bun build` | Build production assets |
| `bun lint` | Lint code |
| `bun preview` | Preview production build |
| `bun deploy` | Build + deploy to Workers |
| `bun cf-typegen` | Generate Worker types |

## Customization

- **API**: Extend `worker/userRoutes.ts`.
- **Pages**: Add routes in `src/main.tsx`.
- **Components**: Use `./src/components/ui/*` or add new shadcn components.
- **Styles**: `src/index.css` + Tailwind config.

## Contributing

1. Fork the repo.
2. Create a feature branch.
3. Commit changes.
4. Open a PR.

## License

MIT – see [LICENSE](LICENSE) for details.