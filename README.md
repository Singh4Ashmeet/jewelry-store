# Aurelia Jewellery

Aurelia Jewellery is a Next.js 13+ e-commerce application for a premium jewellery storefront. It uses TypeScript, Prisma, Zustand, Razorpay, and modern React patterns to provide a complete catalogue-to-checkout experience with customer and admin surfaces.

## Features

- Product catalogue with category pages for rings, necklaces, earrings, bracelets, bridal jewellery, gifts, and new arrivals.
- Product detail pages with image galleries, variant selection, stock-aware cart actions, structured metadata, and JSON-LD product data.
- Virtual try-on for rings, bracelets, earrings, and necklaces using an open-source browser AR stack.
- Persistent shopping cart powered by Zustand and localStorage.
- Persistent wishlist powered by Zustand and localStorage.
- Checkout flow with Zod validation, Razorpay order creation, and a safe mock mode when payment keys are not configured.
- Razorpay webhook endpoint with HMAC signature validation.
- Admin dashboard pages for analytics, customers, inventory, orders, products, and settings.
- Prisma PostgreSQL schema with users, products, variants, images, orders, reviews, coupons, and wishlist items.
- Seed script for initial users, products, reviews, coupons, and an example order.

## Virtual Try-On

Aurelia includes a v1 in-browser virtual try-on experience at `/try-on/[productId]`.

- AR stack: `three` renders starter GLB models. `@mediapipe/hands` tracks ring and bracelet placement, while `@mediapipe/face_mesh` tracks earrings and necklace placement. The requested `@mediapipe/handpose` and `@mediapipe/facemesh` package names are not published on npm; these are the current MediaPipe package equivalents.
- Privacy: camera frames and uploaded photos are processed in-memory in the browser. They are not uploaded or stored by the app unless the user explicitly uses Save & Share.
- Product metadata: `Product.tryOn` stores `modelUrl`, `anchorType`, scale, offsets, supported metals, and gemstone shape/size options.
- Model assets: starter GLB files live in `public/models/` with `public/models/try-on-manifest.json`. Product `tryOn` metadata points to the primary `modelUrl` plus optional `modelUrls`; replace these with production DRACO-compressed GLB files for launch-quality visuals.
- Commercial upgrade path: Banuba and MirrAR are suitable vendor SDK candidates for production jewelry try-on if you need managed model digitization, vendor support, and higher-precision face/neck/3D hand tracking.

## Requirements

- Node.js 20 or later.
- npm 10 or later.
- PostgreSQL 14 or later.

## Environment Variables

Copy `.env.example` to `.env.local` and replace placeholder values before running production-like flows. The `start.py` helper also creates `.env.local` from `.env.example` if it is missing.

Required variables:

- `DATABASE_URL`: PostgreSQL connection string used by Prisma.
- `NEXTAUTH_SECRET`: Secret used by NextAuth.
- `BETTER_AUTH_SECRET`: Auth secret used by local auth helpers.
- `NEXT_PUBLIC_APP_URL`: Public app URL, usually `http://localhost:3000` in development.
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Razorpay checkout credentials.
- `RAZORPAY_WEBHOOK_SECRET`: Secret used to validate Razorpay webhook signatures.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`: Email delivery credentials.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Product media credentials.
- `SHIPROCKET_EMAIL`, `SHIPROCKET_PASSWORD`, `SHIPROCKET_API_URL`: Shipping integration credentials.

## Setup

```bash
npm install
cp .env.example .env.local
npm run db:migrate
npm run db:seed
npm run dev
```

On Windows, you can also run:

```bash
python start.py
```

## Development Commands

```bash
npm run dev          # Start the Next.js dev server
npm run build        # Build the production app
npm run start        # Start the production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript without emitting files
npm run test         # Run Jest tests
npm run test:watch   # Run Jest in watch mode
npm run db:migrate   # Apply Prisma migrations locally
npm run db:seed      # Seed initial data
```

## Prisma

The Prisma schema is in `prisma/schema.prisma` and uses `env("DATABASE_URL")` for the PostgreSQL datasource. Initial migration SQL lives in `prisma/migrations`.

Create a new migration after schema changes:

```bash
npm run db:migrate
```

Seed the database:

```bash
npm run db:seed
```

## Testing

Jest and React Testing Library are configured through `jest.config.ts` and `jest.setup.ts`. Tests live alongside source files or under `__tests__` folders.

Run the full local verification before pushing:

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

## CI

GitHub Actions runs linting, type checking, tests, and a production build on pushes and pull requests to `main`. Dependabot monitors npm packages and GitHub Actions.
