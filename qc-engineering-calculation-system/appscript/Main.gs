/******************************************************
 * QC CALCULATION ENGINE
 * Main.gs
 ******************************************************/

/*
|--------------------------------------------------------------------------
| Global Cache
|--------------------------------------------------------------------------
*/

const CACHE = {
  workingHeader: [],
  workingValues: [],
  parameterMaster: [],
  formulaMaster: []
};


/*
|--------------------------------------------------------------------------
| MAIN ENTRY
|--------------------------------------------------------------------------
*/

function runCalculation(sessionID = null, variables = null) {

  try {

    Logger.log("======================================");
    Logger.log("QC Calculation Started");
    Logger.log("======================================");

    // Load all master data
    loadCache();

    // Get latest session
    let session;

    if (sessionID) {

      session = CACHE.workingHeader.find(function(row){
        return row.SessionID == sessionID;
      });

    } else {

      session = getLatestWorkingSession();

    }

if (!session) {
  throw new Error("No Working Session Found.");
}

    Logger.log("Session : " + session.SessionID);
    Logger.log("Calculation : " + session.CalculationID);
    const calculationVariables = variables || buildVariableDictionary(session.SessionID);

    Logger.log("Variables Loaded");

    // Execute Formula Engine
    const results = executeCalculation(
    session,
    calculationVariables
    );

    validateResult(results);

    printVariables(calculationVariables);

    printResults(results);

    Logger.log("Calculation Completed");

    // Update Google Sheet
    writeCalculatedValues(session.SessionID, results);

    SpreadsheetApp.flush();

    Logger.log("Working Values Updated");

    Logger.log("======================================");
    Logger.log("QC Calculation Finished");
    Logger.log("======================================");

  }

  catch(err){

    Logger.log(err.stack);

    throw err;

  }

}


/*
|--------------------------------------------------------------------------
| LOAD CACHE
|--------------------------------------------------------------------------
*/

function loadCache(){

    CACHE.workingHeader = getWorkingHeader();

    CACHE.workingValues = readSheet(
        CONFIG.SHEETS.WORKING_VALUES
    );

    CACHE.parameterMaster = getParameterMaster();

}


/*
|--------------------------------------------------------------------------
| GET LATEST SESSION
|--------------------------------------------------------------------------
*/

function getLatestWorkingSession(){

    if(CACHE.workingHeader.length==0)
        return null;

    CACHE.workingHeader.sort(function(a,b){

        return new Date(b.CreatedTime)-new Date(a.CreatedTime);

    });

    return CACHE.workingHeader[0];

}


/*
|--------------------------------------------------------------------------
| BUILD VARIABLE DICTIONARY
|--------------------------------------------------------------------------
*/

function buildVariableDictionary(sessionID){

    const variables={};

    CACHE.workingValues.forEach(function(row){

        if(row.SessionID!=sessionID)
            return;

        if(row.Value==="" || row.Value===null)
            return;

        if(!row.Alias)
            return;

        variables[row.Alias]=Number(row.Value);

    });

    return variables;

}


/*
|--------------------------------------------------------------------------
| WRITE CALCULATED VALUES
|--------------------------------------------------------------------------
*/

function writeCalculatedValues(sessionID,results){

    Object.keys(results).forEach(function(parameterID){

        updateWorkingValue(
            sessionID,
            parameterID,
            results[parameterID]
        );

    });

}

/*
|--------------------------------------------------------------------------
| GET FORMULAS FOR CALCULATION
|--------------------------------------------------------------------------
*/

function getCalculationFormulas(calculationID){

    const formulas = getFormulaMaster(calculationID);

    if(formulas.length == 0){

        throw new Error(
            "No Formula Found for Calculation : " + calculationID
        );

    }

    return formulas;

}

/*
|--------------------------------------------------------------------------
| VALIDATE RESULT
|--------------------------------------------------------------------------
*/

function validateResult(results){

    if(!results){

        throw new Error("Formula Engine Returned NULL");

    }

    if(Object.keys(results).length==0){

        throw new Error("No Calculated Values Returned.");

    }

    return true;

}

/*
|--------------------------------------------------------------------------
| PRINT VARIABLES
|--------------------------------------------------------------------------
*/

function printVariables(variables){

    Logger.log("Variables");

    Object.keys(variables).forEach(function(key){

        Logger.log(
            key + " = " + variables[key]
        );

    });

}


/*
|--------------------------------------------------------------------------
| PRINT RESULTS
|--------------------------------------------------------------------------
*/

function printResults(results){

    Logger.log("Calculated Results");

    Object.keys(results).forEach(function(key){

        Logger.log(
            key + " = " + results[key]
        );

    });

}
