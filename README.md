# Dennis Mendez — E-Commerce App

"Everything You Need, Delivered." A multi-vendor marketplace UI built with React + Vite + Tailwind, wrapped with Capacitor so it can run as an installable Android APK.

## What's inside

- Full shopping flow: splash → onboarding → login/register → home → categories → search/filter → product detail → cart → checkout (4-step) → order success → order tracking → wishlist → profile
- Seller Dashboard and Admin Dashboard (basic, functional views)
- Local, on-device "backend": accounts, cart, wishlist, and orders are all stored in the browser's localStorage — **no external server required**, the app works completely standalone
- Design system matched to spec: colors (#005BB5 deep current blue / #E67A00 solar flare orange), Plus Jakarta Sans + Inter fonts, glassmorphism nav, rounded cards, gradient buttons

> **Note on the original spec:** the prompts you provided were written for a web app running on a proprietary backend platform (Base44 SDK). That backend can't run outside its own hosting, so it's been replaced here with local mock data + localStorage, keeping the exact same UI/UX. Everything you see (products, stores, banners) is realistic sample data you can swap for your own later.

---

## 1. Open & preview in VS Code

```bash
# unzip the project, then inside the folder:
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`) in your browser — or open it on your phone's browser if your phone is on the same WiFi network as your computer (use your computer's local IP instead of localhost, e.g. `http://192.168.1.20:5173`).

Any file you edit in VS Code will hot-reload instantly in the browser.

---

## 2. Build an installable APK for your phone

This app is wrapped with **Capacitor**, which takes the built web app and packages it as a real Android app. You have three options — pick whichever fits you best.

### Option A — GitHub Actions (no installs at all, recommended)

This repo already includes `.github/workflows/build-apk.yml`, which builds the APK on GitHub's own servers.

1. Create a free GitHub account if you don't have one, and create a new repository
2. Push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Dennis Mendez app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. On GitHub, go to your repo's **Actions** tab — a "Build Android APK" run will start automatically (or click "Run workflow" to trigger it manually)
4. When it finishes (a few minutes), open the run, scroll to **Artifacts**, and download `dennis-mendez-debug-apk` — that's your APK, ready to send to testers

Nothing is installed on your computer for this option — everything happens on GitHub's servers.

### Option B — PWABuilder (no installs, web-based)

1. Deploy the `dist/` folder (after running `npm run build`) to any free static host — Vercel, Netlify, or GitHub Pages all work in a couple of clicks
2. Go to https://www.pwabuilder.com, paste your deployed URL
3. Click "Package for Stores" → Android → download the generated APK

### Option C — Local build (Android Studio or command-line SDK)

You'll need:
- **Node.js** 18+ (you already have this if step 1 worked)
- Either **Android Studio** (free, full IDE): https://developer.android.com/studio, **or** just the lightweight [command-line SDK tools](https://developer.android.com/studio#command-tools) if you don't want the full IDE

### Steps

```bash
# 1. Build the web app
npm run build

# 2. Add the Android platform (creates an /android folder)
npx cap add android

# 3. Generate all Android icon sizes from resources/icon.png automatically
npx capacitor-assets generate --android

# 4. Copy the web build into the Android project
npx cap sync android

# 5. Open it in Android Studio
npx cap open android
```

In Android Studio:
- Wait for Gradle to finish syncing (first time can take a few minutes)
- Click the green ▶ Run button to install directly on a phone connected via USB (enable Developer Mode + USB Debugging on your phone first), **or**
- Go to `Build → Build Bundle(s) / APK(s) → Build APK(s)` to generate an installable `.apk` file

The generated APK will be at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

Copy that file to your phone (via USB, email, Google Drive, etc.), tap it, and allow "Install from unknown sources" if prompted. This is the file you send to testers.

### Command-line alternative (no Android Studio UI needed)

If you have the Android SDK installed and `ANDROID_HOME` set, you can skip Android Studio entirely:

```bash
cd android
./gradlew assembleDebug
```

The APK appears in the same `outputs/apk/debug/` path above.

---

## 3. App icon

The app icon (blue rounded square with a white "D") is at `public/icon-*.png` for the web app and `resources/icon.png` for the native Android icon. **Once you send me your real logo**, I'll swap this file and it will automatically appear as your app's home-screen icon after you re-run step 2's `capacitor-assets generate` command.

To swap it yourself right now: replace `resources/icon.png` (1024×1024 PNG, no transparency needed for best results) and `resources/splash.png` (2732×2732 PNG splash screen), then re-run:
```bash
npx capacitor-assets generate --android
npx cap sync android
```

---

## 4. Project structure

```
src/
  pages/            All screens (Home, Cart, Checkout, Profile, etc.)
  components/
    layout/         TopBar, BottomNav
    home/           HeroBanner, CategoryStrip, FlashSale, ProductGrid, etc.
    ui/              Buttons, inputs, product cards, skeletons
  lib/
    constants.js     Sample products, stores, categories, banners (edit this to change catalog data)
    AuthContext.jsx  Local mock authentication (localStorage-based)
    useCart.jsx      Cart state (localStorage-based)
    useWishlist.jsx  Wishlist state (localStorage-based)
capacitor.config.json Android app config (app name, package id)
resources/            Source icon/splash images for the native app
```

## 5. Making it "yours"

- **Product catalog**: edit `src/lib/constants.js` — swap in your real products, prices, images, store names
- **App name / package ID**: edit `capacitor.config.json` (`appId`, `appName`)
- **Colors/fonts**: edit `src/index.css` (CSS variables at the top) and `tailwind.config.js`
- **Real backend later**: if you want real accounts/orders synced across devices, the cleanest path is Firebase or Supabase — the `AuthContext.jsx`, `useCart.jsx`, and `useWishlist.jsx` files are the only three files that would need their localStorage calls swapped for API calls
