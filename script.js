// Pseudocode for joining and processing data
function processData(driverStandings, drivers, results) {
    // Convert driverStandings and results to a map for faster lookup
    const standingsMap = new Map(driverStandings.map(d => [d.driverId, d]));
    const resultsMap = new Map(results.map(r => [r.driverId, r]));

    // Join drivers with standings and results
    const joinedData = drivers.map(driver => {
        const standing = standingsMap.get(driver.driverId) || {};
        const result = resultsMap.get(driver.driverId) || {};

        return {
            ...driver,
            ...standing,
            ...result
        };
    });

    // Aggregate total wins for each driver
    const winsByDriver = joinedData.reduce((acc, driver) => {
        const wins = parseInt(driver.wins) || 0;
        acc[driver.driverId] = (acc[driver.driverId] || 0) + wins;
        return acc;
    }, {});

    // Convert the aggregated data to an array suitable for D3
    const processedData = Object.keys(winsByDriver).map(driverId => {
        return {
            driverId: driverId,
            totalWins: winsByDriver[driverId],
            driverName: drivers.find(d => d.driverId === driverId)?.name
        };
    });

    return processedData;
}


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


// Load data using d3.csv and process it
d3.csv("driver_standings.csv").then(driverStandings => {
    d3.csv("drivers.csv").then(drivers => {
        d3.csv("results.csv").then(results => {
            const processedData = processData(driverStandings, drivers, results);
            createBarChart(processedData);
        });
    });
});
