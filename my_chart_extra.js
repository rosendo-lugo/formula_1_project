function initializeChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    const chartTypeSelector = canvas.previousElementSibling.previousElementSibling;
    const dataSetSelector = canvas.previousElementSibling;

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
    // Example: 
    if (dataSet === 'races') {
        return {
            // Data set 1 configuration
        };
    } else if (dataSet === 'circuits') {
        return {
            // Data set 2 configuration
        };
    }
    // Add more conditions for additional data sets
}

function updateChart(chart, type, dataSet, canvas) {
    chart.destroy();
    chart = createChart(type, canvas, getData(dataSet));
}

// Initialize charts for each canvas
initializeChart('myChart');
initializeChart('earning');
