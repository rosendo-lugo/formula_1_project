/*
import { getData } from './acquireData.js'; // Ensure the path is correct*/

// Global declaration of the chart variable
let newChart3;

// Initialization of chart3
const ctx3 = document.getElementById('chart3').getContext('2d');
newChart3 = new Chart(ctx3, {
    type: 'polarArea', // Default type, you can set this dynamically if needed
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});

// Function to get the appropriate chart configuration based on type
function getChartConfig(chartType) {
    switch(chartType) {
        case 'polarArea':
            return {
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                }
            };
            case 'bar':
                return {
                    data: {
                        labels: Utils.months({ count: 7 }), // Make sure Utils.months is defined
                        datasets: [{
                            label: 'My First Dataset',
                            data: [65, 59, 80, 81, 56, 55, 40],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)'
                            ],
                            borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(201, 203, 207)'
                            ],
                            borderWidth: 1
                        }]
                    }
                };
        case 'bubble':
            return {
                data: {
                    datasets: [{
                        label: 'First Dataset',
                        data: [{ x: 20, y: 30, r: 15 }, { x: 40, y: 10, r: 10 }],
                        backgroundColor: 'rgb(255, 99, 132)'
                    }]
                },
                options: {}
            };
        case 'doughnut':
            return {
                data: {
                    labels: ['Red', 'Blue', 'Yellow'],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                        hoverOffset: 4
                    }]
                },
                options: {}
            };
        case 'line':
            return {
                labels = Utils.months({count: 7});
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'My First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
            };
        case 'radar':
            return {
                data: {
                    labels: [
                      'Eating',
                      'Drinking',
                      'Sleeping',
                      'Designing',
                      'Coding',
                      'Cycling',
                      'Running'
                    ],
                    datasets: [{
                      label: 'My First Dataset',
                      data: [65, 59, 90, 81, 56, 55, 40],
                      fill: true,
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgb(255, 99, 132)',
                      pointBackgroundColor: 'rgb(255, 99, 132)',
                      pointBorderColor: '#fff',
                      pointHoverBackgroundColor: '#fff',
                      pointHoverBorderColor: 'rgb(255, 99, 132)'
                    }, {
                      label: 'My Second Dataset',
                      data: [28, 48, 40, 19, 96, 27, 100],
                      fill: true,
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      borderColor: 'rgb(54, 162, 235)',
                      pointBackgroundColor: 'rgb(54, 162, 235)',
                      pointBorderColor: '#fff',
                      pointHoverBackgroundColor: '#fff',
                      pointHoverBorderColor: 'rgb(54, 162, 235)'
                    }]
                },
                options: {
                    elements: {
                        line: {
                            borderWidth: 3
                        }
                    }
                }
            };
        case 'scatter':
            return {
                data: {
                    datasets: [{
                        label: 'Scatter Dataset',
                        data: [{ x: -10, y: 0 }, { x: 0, y: 10 }, { x: 10, y: 5 }, { x: 0.5, y: 5.5 }],
                        backgroundColor: 'rgb(255, 99, 132)'
                    }],
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom'
                        }
                    }
                }
            };
        default:
            return { data: null, options: {} };
    }
}

// Function to update the chart type
function updateChartType(chart, newType) {
    const config = getChartConfig(newType);
    chart.destroy();
    return new Chart(chart.ctx, {
        type: newType,
        data: config.data,
        options: config.options
    });
}

// Event listener for chart3 type selector
document.getElementById('chartTypeSelector3').addEventListener('change', function() {
    newChart3 = updateChartType(newChart3, this.value);
});



/*
const ctx3 = document.getElementById('chart3').getContext('2d');

const newChart3 = new Chart(ctx3, {
    type: 'polarArea',
    data: {
        labels: ['Black', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});
*/

const ctx4 = document.getElementById('chart4').getContext('2d');
const newChart4 = new Chart(ctx4, {
  type: 'bar',
  data: {
      labels: ['Facebook', 'IG', 'Twitter', 'TikTok', 'Snapchat', 'LinkedIn'],
      datasets: [{
          label: 'Social Media',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      responsive: true,
  }
});
 /* 
const ctx = document.getElementById('myChart').getContext('2d');
const earningCtx = document.getElementById('earning').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});

const earningChart = new Chart(earningCtx, {
  type: 'bar',
  data: {
      labels: ['Facebook', 'IG', 'Twitter', 'TikTok', 'Snapchat', 'LinkedIn'],
      datasets: [{
          label: 'Social Media',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      responsive: true,
  }
});
  */
/*
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

function updateChart(chart, newType, newDataSet, canvas) {
    const newData = getData(newDataSet); // Assuming getData returns the new data
    chart.destroy();
    chart = new Chart(document.getElementById(canvas).getContext('2d'), {
        type: newType,
        data: newData,
        options: { responsive: true }
    });
}

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

*/
