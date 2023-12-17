function initializeChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    const selector = canvas.previousElementSibling; // Assuming dropdown is directly before the canvas
    let chart = createChart('polarArea', canvas); // Default type

    selector.addEventListener('change', function() {
        const selectedType = this.value;
        chart.destroy();
        chart = createChart(selectedType, canvas);
    });
}

function createChart(type, canvas) {
    return new Chart(canvas.getContext('2d'), {
        type: type,
        data: {
            // Your data and configurations
        },
        options: {
            // Your options
        }
    });
}

// Initialize charts for each canvas
initializeChart('myChart');
initializeChart('earning');
