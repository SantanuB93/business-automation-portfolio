function calculateFromUI(calculationID, inputValues){

    loadCache();

    const session = {

        SessionID : null,

        CalculationID : Number(calculationID)

    };

    const results = executeCalculation(
        session,
        inputValues
    );

    validateResult(results);

    const output = {};

    Object.keys(results).forEach(function(parameterID){

    const parameter = getParameter(parameterID);

    output[parameter.Alias] = results[parameterID];

});

return output;

}
