/************************************************
 * SHEET HELPER
 ************************************************/

/**
 * Get Spreadsheet
 */
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Get Sheet by Config Name
 */
function getSheet(sheetName) {
  return getSpreadsheet().getSheetByName(sheetName);
}

/**
 * Read any sheet as JSON
 */
function readSheet(sheetName) {

  const sheet = getSheet(sheetName);

  if (!sheet)
    throw new Error("Sheet not found : " + sheetName);

  return sheetToJSON(sheet);

}

/**
 * Read Working Header
 */
function getWorkingHeader() {

  return readSheet(CONFIG.SHEETS.WORKING_HEADER);

}

/**
 * Get latest Session
 */
function getLatestSession() {

  const headers = getWorkingHeader();

  if (headers.length == 0)
    throw new Error("Working Header Empty");

  return getLatestRow(headers);

}

/**
 * Read Working Values of one Session
 */
function getWorkingValues(sessionID) {

  const values = readSheet(CONFIG.SHEETS.WORKING_VALUES);

  return values.filter(v => v.SessionID == sessionID);

}

/**
 * Read Parameter Master
 */
function getParameterMaster() {

  return readSheet(CONFIG.SHEETS.PARAMETER_MASTER);

}

/**
 * Read Formula Master
 */
function getFormulaMaster(calculationID) {

  const formulas = readSheet(CONFIG.SHEETS.FORMULA_MASTER);

  const result = formulas.filter(f => f.CalculationID == calculationID);

  sortBy(result, "FormulaOrder");

  return result;

}

/**
 * Read Calculation Master
 */
function getCalculationMaster() {

  return readSheet(CONFIG.SHEETS.CALCULATION_MASTER);

}

/**
 * Create Alias → Value dictionary
 
function buildVariableDictionary(sessionID, calculationID) {

  const workingValues = getWorkingValues(sessionID);

  const parameterMaster = getParameterMaster();

  const variables = {};

  workingValues.forEach(function (row) {

    const parameter = parameterMaster.find(p => p.ParameterID == row.ParameterID);

    if (!parameter)
      return;

    const alias = parameter.Alias;

    if (!alias)
      return;

    const value = Number(row.Value);

    if (!isNaN(value))
      variables[alias] = value;

  });

  return variables;

}*/

/**
 * Update one Working Value
 */
function updateWorkingValue(sessionID, parameterID, value) {

  const sheet = getSheet(CONFIG.SHEETS.WORKING_VALUES);

  const data = sheet.getDataRange().getValues();

  const headers = data[0];

  const sessionCol = headers.indexOf("SessionID");

  const parameterCol = headers.indexOf("ParameterID");

  const valueCol = headers.indexOf("Value");

  for (let i = 1; i < data.length; i++) {

    if (
      data[i][sessionCol] == sessionID &&
      data[i][parameterCol] == parameterID
    ) {

      sheet.getRange(i + 1, valueCol + 1).setValue(value);

      return;

    }

  }

}

/**
 * Update all calculated values
 */
function updateCalculatedValues(sessionID, results) {

  Object.keys(results).forEach(function (parameterID) {

    updateWorkingValue(
      sessionID,
      parameterID,
      results[parameterID]
    );

  });

}

/**
 * Clear Working Values for a Session
 * (Future use)
 */
function clearWorkingValues(sessionID) {

  const sheet = getSheet(CONFIG.SHEETS.WORKING_VALUES);

  const data = sheet.getDataRange().getValues();

  const headers = data[0];

  const sessionCol = headers.indexOf("SessionID");

  const valueCol = headers.indexOf("Value");

  for (let i = 1; i < data.length; i++) {

    if (data[i][sessionCol] == sessionID) {

      sheet.getRange(i + 1, valueCol + 1).clearContent();

    }

  }

}

/**
 * Delete Working Session
 * (Future use)
 */
function deleteWorkingSession(sessionID) {

  const sheet = getSheet(CONFIG.SHEETS.WORKING_HEADER);

  const data = sheet.getDataRange().getValues();

  const headers = data[0];

  const sessionCol = headers.indexOf("SessionID");

  for (let i = data.length - 1; i >= 1; i--) {

    if (data[i][sessionCol] == sessionID) {

      sheet.deleteRow(i + 1);

    }

  }

}

function getParameter(parameterID){

    return getParameterMaster().find(function(p){

        return p.ParameterID == parameterID;

    });

}
