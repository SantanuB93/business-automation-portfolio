/******************************************************
 * FORMULA ENGINE
 * FormulaEngine.gs
 ******************************************************/


/*
|--------------------------------------------------------------------------
| EXECUTE CALCULATION
|--------------------------------------------------------------------------
*/

function executeCalculation(session, variables){

    Logger.log("--------------------------------------");
    Logger.log("Formula Engine Started");
    Logger.log("--------------------------------------");

    const formulas = getCalculationFormulas(
        session.CalculationID
    );

    const results = {};

    formulas.forEach(function(formula){

        executeSingleFormula(
          session.SessionID,
          formula,
          variables,
          results
        );

    });

    Logger.log("--------------------------------------");
    Logger.log("Formula Engine Finished");
    Logger.log("--------------------------------------");

    return results;

}



/*
|--------------------------------------------------------------------------
| EXECUTE ONE FORMULA
|--------------------------------------------------------------------------
*/

function executeSingleFormula(sessionID, formulaRow, variables, results){

    const parameterID = formulaRow.ParameterID;
    const expression = formulaRow.FormulaText;

    Logger.log("");
    Logger.log("Parameter : " + parameterID);
    Logger.log("Formula   : " + expression);

    const value = evaluateExpression(
        expression,
        variables
    );

    Logger.log("Result    : " + value);

    results[parameterID] = value;

    updateVariableDictionary(
        sessionID,
        parameterID,
        value,
        variables
    );

}

/*
|--------------------------------------------------------------------------
| UPDATE VARIABLE DICTIONARY
|--------------------------------------------------------------------------
*/

function updateVariableDictionary(
    sessionID,
    parameterID,
    value,
    variables
){

    const parameter = getParameter(parameterID);

    if(!parameter){
        throw new Error(
            "Parameter not found : " + parameterID
        );
    }

    // Make calculated value available for the next formulas
    if(parameter.Alias){
        variables[parameter.Alias] = value;
    }

    // Web Application
    // No Working Session exists, so nothing more to do.
    if(sessionID == null){
        return;
    }

    // Google Sheet mode
    // Nothing required here because writeCalculatedValues()
    // writes all results after the calculation finishes.
}


/*
|--------------------------------------------------------------------------
| EVALUATE EXPRESSION
|--------------------------------------------------------------------------
*/

function evaluateExpression(expression,variables){

    Logger.log("Replacing Variables...");

    let formula = expression;

    formula = replaceVariables(
        formula,
        variables
    );

    Logger.log(formula);

    formula = normalizeFormula(formula);

    Logger.log(formula);

    const value = calculateFormulaValue(
        formula
    );

    return value;

}

/*
|--------------------------------------------------------------------------
| REPLACE VARIABLES
|--------------------------------------------------------------------------
*/

function replaceVariables(formula, variables){

    Object.keys(variables).forEach(function(alias){

        const regex = new RegExp("\\b" + alias + "\\b","g");

        formula = formula.replace(
            regex,
            variables[alias]
        );

    });

    return formula;

}

/*
|--------------------------------------------------------------------------
| NORMALIZE FORMULA
|--------------------------------------------------------------------------
*/

function normalizeFormula(formula){

    formula = formula.replace(/PI\(\)/gi,"Math.PI");

    formula = convertPower(formula);

    formula = convertFunctions(formula);

    return formula;

}

/*
|--------------------------------------------------------------------------
| POWER()
|--------------------------------------------------------------------------
|
| POWER(10,2)
|
| becomes
|
| Math.pow(10,2)
|
|--------------------------------------------------------------------------
*/

function convertFunctions(formula){

    formula = formula.replace(
        /(?<!Math\.)\bLOG\s*\(/gi,
        "Math.log10("
    );

    formula = formula.replace(
        /(?<!Math\.)\bLN\s*\(/gi,
        "Math.log("
    );

  
    formula = formula.replace(
        /(?<!Math\.)\bPOWER\s*\(/gi,
        "Math.pow("
    );

    formula = formula.replace(
        /(?<!Math\.)\bSQRT\s*\(/gi,
        "Math.sqrt("
    );

    formula = formula.replace(
        /(?<!Math\.)\bABS\s*\(/gi,
        "Math.abs("
    );

    formula = formula.replace(
        /(?<!Math\.)\bROUND\s*\(/gi,
        "Math.round("
    );


    formula = formula.replace(
        /(?<!Math\.)\bSIN\s*\(([^()]*)\)/gi,
        "Math.sin(($1)*Math.PI/180)"
    );

    formula = formula.replace(
        /(?<!Math\.)\bCOS\s*\(([^()]*)\)/gi,
        "Math.cos(($1)*Math.PI/180)"
    );

    formula = formula.replace(
        /(?<!Math\.)\bTAN\s*\(([^()]*)\)/gi,
        "Math.tan(($1)*Math.PI/180)"
    );
    return formula;

}

/*
|d^2 becomes Math.pow(d,2)
|--------------------------------------------------------------------------
*/

function convertPower(formula){

    while(formula.includes("^")){

        formula = formula.replace(

            /([A-Za-z0-9_.]+)\^([A-Za-z0-9_.]+)/,

            "Math.pow($1,$2)"

        );

    }

    return formula;

}

/*
|--------------------------------------------------------------------------
| CALCULATE VALUE
|--------------------------------------------------------------------------
*/

function calculateFormulaValue(formula){

    try{

        return Function(

            '"use strict"; return (' +

            formula +

            ')'

        )();

    }

    catch(err){

        throw new Error(

            "Formula Error : " +

            formula +

            "\n" +

            err.message

        );

    }

}
