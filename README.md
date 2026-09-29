# erikcarlson.dev 

## Getting Started

After installing project dependencies, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Checks

Before opening a pull request, run:

```bash
npm run check
```

This runs two scripts, which you can also run on their own:

- `npm run lint` runs ESLint with the flat config in `eslint.config.mjs`.
- `npm run typecheck` generates the Next.js types (`next-env.d.ts` and `.next/types`) with `next typegen`, then type-checks the project with `tsc --noEmit`. The generated files are git-ignored, so this works on a fresh clone without running `next build` or `next dev` first.
