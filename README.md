# Dennis Mendez — E-Commerce App

"Everything You Need, Delivered." A multi-vendor marketplace UI built with React + Vite + Tailwind, integrated with the **Shinazugawa API** (Salam Exporters backend), wrapped with Capacitor for Android.

## Backend integration

This app talks to the production API:

- **Base URL:** `https://salamexporters.com/api/v1`
- **Swagger:** https://docs.salamexporters.com/swagger/index.html

Catalog routes use the `/public` prefix (e.g. `/public/products`, `/public/categories`). Auth, cart, wishlist, and orders use JWT Bearer tokens stored in `sessionStorage`.

### Environment

```env
# .env.production (committed)
VITE_API_BASE_URL=https://salamexporters.com/api/v1
```

During local dev (`npm run dev`), requests proxy through Vite to avoid CORS issues.

### API layer

```
src/lib/api/
  config.js          Base URL
  apiClient.js       fetch wrapper + JWT refresh
  tokenStorage.js    access/refresh tokens
  authService.js     login, register, OTP, password reset
  catalogService.js  products, categories, stores
  cartService.js     cart CRUD
  wishlistService.js wishlist CRUD
  orderService.js    checkout, orders, coupons
src/lib/mappers/     API DTO → UI shape
```

---

## What's inside

- Full shopping flow: splash → onboarding → login/register/OTP → home → categories → search → product detail → cart → checkout → order success → orders → wishlist → profile
- Seller Dashboard and Admin Dashboard (read from API where available)
- JWT auth with OTP verification and password reset
- Server-backed cart, wishlist, and orders

---

## 1. Open & preview

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The dev server proxies `/api/v1` to production.

---

## 2. Git branch for review

Integration work lives on branch **`ish`**. Compare against `main`:

```bash
git fetch origin
git diff main...ish
```

---

## 3. Build an installable APK

See original Capacitor instructions below — run `npm run build` before `cap sync`.

```bash
npm run build
npx cap sync android
npx cap open android
```

---

## 4. Project structure

```
src/
  pages/            All screens
  components/       UI + layout + home sections
  lib/
    api/            REST client + services
    mappers/        DTO → UI mappers
    AuthContext.jsx JWT session
    useCart.jsx     Server cart
    useWishlist.jsx Server wishlist
    constants.js    UI config (delivery, payment, banners)
capacitor.config.json
.env.production
```

## Suggested commit message

`feat(api): integrate shinazugawa production backend`
