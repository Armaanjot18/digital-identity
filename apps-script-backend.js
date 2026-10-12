/**
 * ╔══════════════════════════════════════════════════════╗
 *  Digital Identity – Google Apps Script Backend
 *  Receives file data from the website and saves it
 *  directly into the specified Google Drive folder.
 * ╚══════════════════════════════════════════════════════╝
 *
 * HOW TO DEPLOY (one-time setup):
 *  1. Go to https://script.google.com/ → New Project
 *  2. Delete any existing code, paste ALL of this file's content
 *  3. Click "Deploy" → "New Deployment"
 *  4. Type: Web App
 *  5. Execute as: Me
 *  6. Who has access: Anyone
 *  7. Click Deploy → copy the Web App URL
 *  8. In index.html replace  YOUR_APPS_SCRIPT_URL_HERE  with that URL
 */

function doPost(e) {
  try {
    var payload  = JSON.parse(e.postData.contents);
    var fileName = payload.fileName;
    var mimeType = payload.mimeType;
    var data     = payload.data;          // base64 string
    var folderId = payload.folderId;      // Drive folder ID

    // Decode base64 → Blob
    var decoded = Utilities.base64Decode(data);
    var blob    = Utilities.newBlob(decoded, mimeType, fileName);

    // Save to Drive folder
    var folder = DriveApp.getFolderById(folderId);
    var file   = folder.createFile(blob);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', fileId: file.getId(), fileName: fileName }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight (OPTIONS)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Digital Identity Upload API is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
