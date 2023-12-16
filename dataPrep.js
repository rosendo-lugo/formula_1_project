// dataPrep.js
function cleanData(data, options = {}) {
    const { fillValue = null, removeRowsWithMissingValues = false } = options;

    return data.map(row => {
        let shouldRemoveRow = false;
        const cleanedRow = {};

        for (const [key, value] of Object.entries(row)) {
            if (value === null || value === 'N/A') {
                if (removeRowsWithMissingValues) {
                    shouldRemoveRow = true;
                    break;
                } else {
                    cleanedRow[key] = fillValue;
                }
            } else {
                cleanedRow[key] = value;
            }
        }

        return shouldRemoveRow ? null : cleanedRow;
    }).filter(row => row !== null);
}


module.exports = { cleanData};