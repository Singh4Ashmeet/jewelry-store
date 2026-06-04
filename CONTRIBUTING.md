# Contributing

Thanks for improving Aurelia Jewellery. Keep changes focused, typed, and easy to review.

## Coding Standards

- Use TypeScript and the shared types in `src/types` where possible.
- Format with Prettier and keep Tailwind classes ordered by `prettier-plugin-tailwindcss`.
- Keep ESLint clean with `npm run lint`.
- Prefer semantic HTML, accessible labels, and Next.js primitives such as `next/image` and the metadata API.
- Add or update tests when behavior changes.

## Branching

- Create feature branches from `main`.
- Use descriptive branch names such as `feature/wishlist-store` or `fix/checkout-validation`.
- Open a pull request before merging to `main`.
- Keep pull requests small enough to review comfortably.

## Local Verification

Run these commands before committing:

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

The Husky pre-commit hook runs lint and tests automatically. CI also runs lint, type-check, tests, and build.

## Database Changes

- Update `prisma/schema.prisma`.
- Create a migration with `npm run db:migrate`.
- Update `prisma/seed.ts` when new required data is introduced.
