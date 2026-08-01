/************************************************
 * GENERAL UTILITIES
 ************************************************/

/**
 * Convert sheet to JSON
 */
function sheetToJSON(sheet) {

  const data = sheet.getDataRange().getValues();

  const headers = data.shift();

  return data.map(r => {

    let obj = {};

    headers.forEach((h,i)=>{
      obj[h]=r[i];
    });

    return obj;

  });

}


/**
 * Find object by key/value
 */
function findBy(list,key,value){

  return list.find(x=>x[key]==value);

}


/**
 * Filter objects
 */
function filterBy(list,key,value){

  return list.filter(x=>x[key]==value);

}


/**
 * Sort by numeric field
 */
function sortBy(list,key){

  list.sort(function(a,b){

    return Number(a[key])-Number(b[key]);

  });

}


/**
 * Build Alias Dictionary
 */
function buildAliasDictionary(parameters){

  let alias={};

  parameters.forEach(p=>{

      alias[p.ParameterID]=p.Alias;

  });

  return alias;

}


/**
 * Latest Created Row
 */
function getLatestRow(rows){

    rows.sort(function(a,b){

      return new Date(b.CreatedTime)-new Date(a.CreatedTime);

    });

    return rows[0];

}

/Convert formulas/
function convertPowerOperators(formula){

    while(formula.includes("^")){

        formula=formula.replace(
            /([A-Za-z0-9_.]+)\^([A-Za-z0-9_.]+)/,
            "Math.pow($1,$2)"
        );

    }

    return formula;

}


/**
 * Safe Evaluation
 */
function evaluateFormula(formula){

    try{

        return eval(formula);

    }

    catch(e){

        throw new Error("Formula Error : "+formula);

    }

}
