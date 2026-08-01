/**
 * Returns all data required by the UI.
 */
function getApplicationData() {

  const parameters = getParameterMaster();

  parameters.sort((a, b) => {
    if (a.CalculationID !== b.CalculationID) {
      return a.CalculationID - b.CalculationID;
    }
    return a.Sequence - b.Sequence;
  });

  return {
    items: getItems(),
    calculations: getCalculationMaster(),
    parameters: parameters
  };
}

/**
 * Returns Item Master
 */
function getItems() {

  const rows = readSheet(CONFIG.SHEETS.FORMING_MASTER);

  return rows.map(r => ({

    ItemID: Number(r.ItemID),

    ItemName: r.ItemName

  }));

}
