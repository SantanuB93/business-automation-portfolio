const CONFIG = {
  SHEET_NAME: "Customer Visit",
  FOLDER_ID: PropertiesService.getScriptProperties().getProperty("FOLDER_ID"),
  RECIPIENTS: PropertiesService.getScriptProperties().getProperty("RECIPIENTS"),
  BCC: PropertiesService.getScriptProperties().getProperty("BCC")
};

function doGet() {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("Customer Visit Form")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(file){
  return HtmlService.createHtmlOutputFromFile(file).getContent();
}
function getUserEmail() {
  return Session.getActiveUser().getEmail();
}

function saveData(obj){

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);

  let links=[];

  if(obj.files){

    obj.files.forEach(file=>{

      const blob = Utilities.newBlob(
        Utilities.base64Decode(file.bytes),
        file.mimeType,
        file.fileName
      );

      const f=DriveApp.getFolderById(CONFIG.FOLDER_ID).createFile(blob);

      links.push(f.getUrl());

    });

  }

  sheet.appendRow([
    obj.date,
    obj.email,
    obj.place,
    //obj.customers.join(", "),
    obj.customers,
    obj.purpose,
    obj.kmStart,
    obj.kmEnd,
    obj.latitude,
    obj.longitude,
    obj.mapLink,
    links.join("\n"),
    obj.remarks,
    new Date()
  ]);


  sendMail(obj,links);

  return "Success";
}

function sendMail(obj,links){

  let body="";

  body+="Customer Visit Details\n\n";

  body+="Date : "+obj.date+"\n";
  body+="Employee : "+obj.email+"\n";
  body+="Place : "+obj.place+"\n";
  body+="Purpose : "+obj.purpose+"\n";
  body+="Remarks : "+obj.remarks+"\n";
  body+="KM Start : "+obj.kmStart+"\n";
  body+="KM End : "+obj.kmEnd+"\n";
  body+="Latitude : "+obj.latitude+"\n";
  body+="Longitude : "+obj.longitude+"\n";
  body += "Google Map : " + obj.mapLink + "\n\n";

  /*body+="Customers Visited\n";

  obj.customers.forEach((c,i)=>{
    body+=(i+1)+". "+c+"\n";
  });*/
  body+="Customer Visited : "+obj.customers+"\n\n";

  body+="\nAttachments\n";

  links.forEach(l=>{
    body+=l+"\n";
  });

  GmailApp.sendEmail(
    CONFIG.RECIPIENTS,
    "Customer Visit - "+obj.email,
    body,{
      bcc:CONFIG.BCC
    }
  );

}
