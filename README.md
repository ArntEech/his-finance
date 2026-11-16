# HIS Theatre apps (installable on Android and iPhone)

Two small "app shells" that open the HIS Finance pages full screen with their own home-screen icons.

| Folder | App name | Who it is for |
|---|---|---|
| `dues/` | HIS Dues | every member (check own dues) |
| `officer/` | HIS Finance | Financial Secretary and Treasurer (PIN) |

All data still lives in the HIS Finance Google Sheet. These files only wrap the pages.

## One-time setup
1. In HIS Finance → Apps Script → `Code.gs`, in `doGet`, the last line must read
   `.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);`
   then Deploy → Manage deployments → ✏️ → New version → Deploy.
2. Put this folder on GitHub Pages (free): create a public repository named `his-apps`,
   upload everything in this folder, then Settings → Pages → Branch: `main`, folder `/ (root)` → Save.
3. Your links (replace USERNAME):
   - Members:  `https://USERNAME.github.io/his-apps/`
   - Officers: `https://USERNAME.github.io/his-apps/officer/`

## Installing
- **Android (Chrome):** open the link → tap **Install** on the bar at the top (or ⋮ → Add to Home screen / Install app).
- **iPhone (Safari only):** open the link → Share button → **Add to Home Screen** → Add.

## If you ever create a brand-new Apps Script deployment
Edit `config.js` and paste the new `/exec` link. Nothing else changes; installed apps pick it up.
