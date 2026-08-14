# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
defines a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## Conventions

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dynamic — bare `$`, no curly braces) |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment) |
| `files/$.tsx` | `/files/*` (splat — read via `_splat` param, never `*`) |
| `_layout.tsx` | layout route (renders children via `<Outlet />`) |
| `__root.tsx` | app shell — wraps every page; preserve `<Outlet />` |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.

## Safe Area rule (global)

Every screen is wrapped by `<Screen>` in `__root.tsx`, which applies iPhone
safe areas automatically (horizontal insets + Home Indicator + bottom nav gap).
New screens need **no manual inset math**.

- sticky/fixed header: add `safe-top safe-sticky-top`
- fixed/floating bottom element: add `safe-bottom`
- screen with no header that starts at the notch: `<Screen withTopInset>`
- never write `env(safe-area-inset-*)` in a screen; use the utilities in
  `src/styles.css` (`safe-top`, `safe-bottom`, `safe-x`, `safe-nav-gap`,
  `safe-sticky-top`) so RTL and all iPhone sizes stay consistent.
