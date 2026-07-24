# Android App Links (Dennis Mendez)

Verified App Links require this file at:

`https://salamexporters.com/.well-known/assetlinks.json`

## Setup

1. Build a release APK/AAB and get the signing cert SHA-256:

```bash
keytool -list -v -keystore path/to/release.keystore -alias your-alias
```

2. Replace `REPLACE_WITH_RELEASE_KEYSTORE_SHA256` in
   [`public/.well-known/assetlinks.json`](../public/.well-known/assetlinks.json)
   (colons optional; Google accepts either form).

3. Serve the JSON from the production host (nginx/CDN) with
   `Content-Type: application/json` and no auth redirect.

4. Rebuild/sync the Android app after updating
   `android/app/src/main/AndroidManifest.xml` intent-filters.

5. Verify:

```bash
adb shell pm get-app-links com.dennismendez.app
```

Custom scheme fallback (works without assetlinks): `com.dennismendez.app://reset-password?token=...`
