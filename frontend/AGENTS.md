<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:Project-agent-rules -->

## Before start Read your skills: React-design-pattern, Better-ui, Improve-animation, frontend-design

## UI GuideLines

1. All UI components must be reusable and all Shadcn UI Reusable component must need to be use. Don't use any custom components. If any component need customization, when you can make separate UI component based on shadcn Ui components.

## Repo notes

This dir is the `frontend` app of a monorepo; the Laravel API (and Reverb broadcasting) lives in `../backend`. Stack: Next.js 16.3.5, React 19.2.8, TypeScript strict, Tailwind v4, shadcn UI. Very early stage — only `(auth)` pages and a placeholder home exist.

### Commands

- `npm run dev` / `npm run build` / `npm run lint` (ESLint, no `--fix`).
- `npx tsc --noEmit` to typecheck. Run `next dev`/`next build` first: `next-env.d.ts` imports generated types from `.next/**/types`, so tsc fails on a clean tree.
- No test runner is configured here.

### Next.js 16

- `PageProps` / `LayoutProps` are globally generated helpers — do not import them. Routes are typed in `.next/dev/types/routes.d.ts`.
- Read `node_modules/next/dist/docs/` (esp. `01-app/01-getting-started/upgrading.md`, `01-app/02-guides/ai-agents.md`) before using framework APIs.

### UI (shadcn)

- Add components with `npx shadcn add <name>`; they land in `src/components/ui`, hooks in `src/hooks` (created on first add).
- `components.json`: style `base-luma`, base color zinc, lucide icons. Primitives come from `@base-ui/react` (Base UI) — **not** Radix; do not install `@radix-ui/*`.
- `cn` is re-exported from the `cn` npm package by `@/lib/utils`; do not add `clsx`/`tailwind-merge`.
- Tailwind v4 is CSS-first: no `tailwind.config.*`. Theme tokens/variants live in `src/app/globals.css` (`@theme inline`, `.dark` variant); it imports `shadcn/tailwind.css` and `tw-animate-css`.
- Fonts wired in `src/app/layout.tsx`: Raleway → `--font-sans` (body/heading), Poppins → `--font-poppins-sans`.

### Routing

- App Router groups: `src/app/(auth)/` (login, register) and `src/app/(root)/` (main app). Put new pages in the matching group.
- Import alias `@/*` → `src/*`.

<!-- END:Project-agent-rules -->
