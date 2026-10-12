# 🎨 Digital Identity — Event Submission Website

A beautifully designed event website for the **Digital Identity** logo designing competition. Participants can read the rules and submit their designs directly to Google Drive.

---

## 🌐 Live Site
Deployed via **GitHub Pages** — visit `https://Armaanjot18.github.io/digital-identity`

---

## ✨ Features
- **Hero header** with gold & navy event branding
- **Rules section** — all 10 competition rules in card layout
- **Upload section** — accepts **all file types**, renames file as `SCHOOLCODE_filename`, and uploads directly to Google Drive
- **Success confirmation** — shows *"[filename] has been uploaded with your assigned school code only."*

---

## ⚙️ Setup: Connect Google Drive Upload

The upload requires a **Google Apps Script Web App** as the backend middleware.

### Step-by-step (one time only):

1. Go to [script.google.com](https://script.google.com) → **New project**
2. Delete existing code, paste everything from [`apps-script-backend.js`](apps-script-backend.js)
3. Click **Deploy → New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy** → **copy the Web App URL**
5. Open [`index.html`](index.html), find this line:
   ```js
   const GOOGLE_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```
   Replace `YOUR_APPS_SCRIPT_URL_HERE` with your copied URL.
6. Commit & push — uploads will now land in your Google Drive folder!

---

## 📁 Google Drive Folder
Files are saved to: [Digital Identity Submissions](https://drive.google.com/drive/folders/1SGfVTfzyEN69pfafejLfGEvMzd-TN8Dr)

Each file is automatically renamed: **`SCHOOLCODE_originalfilename.ext`**

---

## 🛠 Tech Stack
- Pure HTML / CSS / JavaScript (no frameworks)
- Google Apps Script (serverless backend)
- GitHub Pages (hosting)
