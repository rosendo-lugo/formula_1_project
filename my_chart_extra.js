import { getData } from './my_chart_extra.js';

// Initialize the chart for a specific canvas and its associated selectors
function initializeChart(canvasId, dataSetSelectorClass) {
    const canvas = document.getElementById(canvasId);
    const chartTypeSelector = canvas.previousElementSibling.previousElementSibling;
    const dataSetSelector = document.querySelector(dataSetSelectorClass);

    let chart = createChart('polarArea', canvas, getData('races')); // Default type and data set

    chartTypeSelector.addEventListener('change', function() {
        updateChart(chart, this.value, dataSetSelector.value, canvas);
    });

    dataSetSelector.addEventListener('change', function() {
        updateChart(chart, chartTypeSelector.value, this.value, canvas);
    });
}

function createChart(type, canvas, data) {
    return new Chart(canvas.getContext('2d'), {
        type: type,
        data: data,
        options: { responsive: true }
    });
}

function getData(dataSet) {
    // Return the data object based on the dataSet argument
    // Modify this function to fetch and return the actual data
    // For example:
    if (dataSet === 'races') {
        // Fetch and process 'races' data
    } else if (dataSet === 'circuits') {
        // Fetch and process 'circuits' data
    }
    // Add more conditions for additional data sets
    // ...
}

function updateChart(chart, type, dataSet, canvas) {
    const newData = getData(dataSet);
    if (newData) {
        chart.destroy();
        chart = createChart(type, canvas, newData);
    }
}

// Initialize charts for each canvas with the appropriate dataset selector
initializeChart('myChart', '.dataSetSelector1');
initializeChart('earning', '.dataSetSelector2');


function parseCSV(csvData) {
    const lines = csvData.split('\n');
    return lines.map(line => line.split(','));
}
function updateRecentOrders(data) {
    const tableBody = document.querySelector('#ordersTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((row, index) => {
        if (index === 0) return; // Assuming first row is headers

        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
}
fetch('path/to/yourfile.csv')
    .then(response => response.text())
    .then(csvText => {
        const [headers, ...rows] = parseCSV(csvText);
        updateTableHeaders(headers);
        updateTableRows(rows);
    })
    .catch(error => console.error('Error fetching CSV:', error));

function parseCSV(csvData) {
    const lines = csvData.split('\n');
    return lines.map(line => line.split(','));
}

function updateTableHeaders(headers) {
    const thead = document.querySelector('#ordersTable thead');
    thead.innerHTML = ''; // Clear existing headers
    const tr = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });

    thead.appendChild(tr);
}

function updateTableRows(rows) {
    const tbody = document.querySelector('#ordersTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell.trim(); // Add the cell data to the table cell
            tr.appendChild(td); // Append the table cell to the row
        });
        tbody.appendChild(tr); // Append the row to the tbody
    });
}

