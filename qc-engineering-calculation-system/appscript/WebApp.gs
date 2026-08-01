/******************************************************
 * WebApp Entry Point
 ******************************************************/

function doPost(e) {

  try {

    const request = JSON.parse(e.postData.contents);

    const sessionID = request.sessionID;

    runCalculation(sessionID);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true,
          sessionID: sessionID
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          message: err.message
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  }

}
