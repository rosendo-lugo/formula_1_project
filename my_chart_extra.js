/*
import { getData } from './acquireData.js'; // Ensure the path is correct*/


const ctx3 = document.getElementById('chart3').getContext('2d');
const ctx4 = document.getElementById('chart4').getContext('2d');
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
