/**
 * ╔══════════════════════════════════════════════════════╗
 *  Digital Identity – Google Apps Script Backend
 *  1. Receives file uploads and saves to Google Drive.
 *  2. Serves submission logs (filenames, timestamps, links)
 *     for the Admin/Developer Dashboard.
 * ╚══════════════════════════════════════════════════════╝
 *
 * HOW TO UPDATE / DEPLOY:
 *  1. Open your project at https://script.google.com/
 *  2. Replace Code.gs with this entire file.
 *  3. Click "Deploy" → "Manage Deployments" → ✏️ Edit
 *  4. Select "New version" under Version → Click "Deploy"
 */

function doPost(e) {
  try {
    var payload  = JSON.parse(e.postData.contents);
    var fileName = payload.fileName;
    var mimeType = payload.mimeType;
    var data     = payload.data;          // base64 string
    var folderId = payload.folderId || '1SGfVTfzyEN69pfafejLfGEvMzd-TN8Dr';

    // Decode base64 → Blob
    var decoded = Utilities.base64Decode(data);
    var blob    = Utilities.newBlob(decoded, mimeType, fileName);

    // Save to Drive folder
    var folder = DriveApp.getFolderById(folderId);
    var file   = folder.createFile(blob);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        fileId: file.getId(),
        fileName: fileName,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET requests:
 * 1. Default: returns status "ok" (health check)
 * 2. action=getSubmissions: lists all files in the Drive folder with timestamps & links
 */
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : '';

    if (action === 'getSubmissions') {
      var folderId = (e && e.parameter && e.parameter.folderId) ? e.parameter.folderId : '1SGfVTfzyEN69pfafejLfGEvMzd-TN8Dr';
      var folder = DriveApp.getFolderById(folderId);
      var files = folder.getFiles();
      var submissions = [];

      while (files.hasNext()) {
        var file = files.next();
        submissions.push({
          id: file.getId(),
          name: file.getName(),
          size: file.getSize(),
          mimeType: file.getMimeType(),
          created: file.getDateCreated().toISOString(),
          updated: file.getLastUpdated().toISOString(),
          url: file.getUrl()
        });
      }

      // Sort newest submission first
      submissions.sort(function(a, b) {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });

      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'success',
          count: submissions.length,
          folderId: folderId,
          submissions: submissions
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Default health check
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: 'Digital Identity Upload API is running.' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
