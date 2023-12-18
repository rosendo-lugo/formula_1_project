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
