# 🎨 Digital Identity — Event Management & Submission Portal

Official web platform for the **Digital Identity** logo designing competition (Event No. 4).

---

## 🌐 Live Website
- **Custom Domain:** [http://curious.rocks](http://curious.rocks)
- **GitHub Pages:** [https://Armaanjot18.github.io/digital-identity](https://Armaanjot18.github.io/digital-identity)

---

## 🧭 Multi-Page Workflow

1. **Overview & Rules (`/` or `index.html`)**:
   - Event branding, 10 official competition rules.
   - Procedure to add files (Max 50 MB, PNG/JPEG/JPG/PDF only, block HTML/SVG/WEBP, mandatory preservation rule).
   - "Proceed to Theme & Start Competition" button.

2. **Theme & Timer (`/theme.html`)**:
   - On-the-spot theme announcement workspace.
   - Interactive 60-Minute countdown clock with pause, resume, and reset.
   - Visual alerts at 10m & 5m remaining.
   - "Proceed to Submit / Upload File" button.

3. **Dedicated Submission Portal (`/upload.html`)**:
   - Input for Assigned School Code.
   - File selector with drag & drop.
   - Real-time client-side validation (50 MB limit, strict format whitelist).
   - **👁️ Preview File** modal (inspect design dimensions, preview image, target filename).
   - **✕ Clear Selection** button.
   - Direct transmission to Google Drive with progress animation.

4. **Admin & Developer Portal (`/admin.html`)**:
   - **Password-protected** gate (Default: `admin2026`, customizable inside portal).
   - Real-time submission logs streaming from Google Drive.
   - Shows School Code, File Name, Upload Timestamp, and Size.
   - Live search & sorting (by code, newest, oldest).
   - **📥 Export to CSV** spreadsheet button.
   - Direct links to open/inspect files inside Google Drive.

---

## ⚙️ Google Apps Script Backend (`apps-script-backend.js`)

Connects the web frontend with Google Drive:
- **`doPost`**: Receives base64-encoded files and saves them to the Google Drive folder (`1SGfVTfzyEN69pfafejLfGEvMzd-TN8Dr`).
- **`doGet?action=getSubmissions`**: Fetches the list of all uploaded files with timestamps and direct links for the Admin portal.
