import { getData } from './acquireData.js'; // Ensure the path is correct

function initializeChart(canvasId, dataSetSelectorClass) {
    const canvas = document.getElementById(canvasId);
    const chartTypeSelector = canvas.previousElementSibling.previousElementSibling;
    const dataSetSelector = document.querySelector(dataSetSelectorClass);

    let chart = createChart('polarArea', canvas, getData('races'));

    chartTypeSelector.addEventListener('change', function() {
        updateChart(chart, this.value, dataSetSelector.value, canvas);
    });

    dataSetSelector.addEventListener('change', function() {
        updateChart(chart, chartTypeSelector.value, this.value, canvas);
    });
}

function createChart(type, canvas, data) {
    return new Chart(canvas.getContext('2d'), { type, data, options: { responsive: true } });
}

initializeChart('myChart', '.dataSetSelector1');
initializeChart('earning', '.dataSetSelector2');

document.querySelector('.dataSetSelector3').addEventListener('change', function() {
    fetchCSVAndUpdateTable(this.value);
});

function fetchCSVAndUpdateTable(fileName) {
    const filePath = `path/to/${fileName}.csv`;
    fetch(filePath)
        .then(response => response.text())
        .then(csvText => {
            const [headers, ...rows] = parseCSV(csvText);
            updateTableHeaders(headers);
            updateTableRows(rows);
        })
        .catch(error => console.error('Error fetching CSV:', error));
}

function parseCSV(csvData) {
    return csvData.split('\n').map(line => line.split(','));
}

function updateTableHeaders(headers) {
    const thead = document.querySelector('#fullDataTable thead');
    thead.innerHTML = headers.map(header => `<th>${header}</th>`).join('');
}

function updateTableRows(rows) {
    const tbody = document.querySelector('#fullDataTable tbody');
    tbody.innerHTML = rows.map(row => `<tr>${row.map(cell => `<td>${cell.trim()}</td>`).join('')}</tr>`).join('');
}
