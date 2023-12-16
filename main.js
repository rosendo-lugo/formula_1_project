// main.js
const { processData } = require('./acquireData');
const { cleanData } = require('./dataPrep');


// Pseudocode for creating a bar chart
function createBarChart(data) {
// Set dimensions and margins for the chart
    const margin = { top: 20, right: 20, bottom: 70, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Append SVG object to the chart div
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set the ranges for the scales
const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
const y = d3.scaleLinear()
    .range([height, 0]);

// Scale the range of the data in the domains
x.domain(data.map(d => d.driverName));
y.domain([0, d3.max(data, d => d.totalWins)]);

// Append the rectangles for the bar chart
svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", d => x(d.driverName))
  .attr("width", x.bandwidth())
  .attr("y", d => y(d.totalWins))
  .attr("height", d => height - y(d.totalWins))
  .attr("fill", "#69b3a2");

// Add the x-axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-65)");

// Add the y-axis
svg.append("g")
  .call(d3.axisLeft(y));
}


function countDriversByNationality(data) {
  return data.reduce((acc, { nationality }) => {
      acc[nationality] = (acc[nationality] || 0) + 1;
      return acc;
  }, {});
}

function createNationalityChart(data) {
  const counts = countDriversByNationality(data);
  const sortedNationalities = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const labels = sortedNationalities.map(item => item[0]);
  const values = sortedNationalities.map(item => item[1]);

  //
  const trace = {
      type: 'pie',
      labels: labels,
      values: values,
      textfont: { size: 20 },
      marker: { line: { color: '#000000', width: 2 } }
  };

  const layout = {
      title: "Top 10 Nationalities Since 1950",
      height: 400,
      width: 500
  };

  Plotly.newPlot('myDiv', [trace], layout);
}

createNationalityChart(driversData);
