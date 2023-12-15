function processData(driverStandings, drivers, results, qualifying, pitStops, lapTimes, races, sprintResults, seasons, status, constructors, constructorResults, constructorStandings, circuits) {
    // Maps for faster lookup
    const standingsMap = new Map(driverStandings.map(d => [d.driverId, d]));
    const resultsMap = new Map(results.map(r => [r.driverId, r]));
    const qualifyingMap = new Map(qualifying.map(q => [q.driverId, q]));
    const pitMap = new Map(pitStops.map(p => [p.driverId, p]));
    const lapMap = new Map(lapTimes.map(l => [l.driverId, l]));
    const sprintMap = new Map(sprintResults.map(s => [s.driverId, s]));
    const driversMap = new Map(drivers.map(d => [d.driverId, d]));
    const seasonsMap = new Map(seasons.map(s => [s.year, s]));
    const statusMap = new Map(status.map(s => [s.statusId, s]));
    const racesMap = new Map(races.map(r => [r.circuitId, r]));
    const circuitsMap = new Map(circuits.map(c => [c.circuitId, c]));
    const constrMap = new Map(constructors.map(c => [c.constructorId, c]));
    const constrResultsMap = new Map(constructorResults.map(c => [c.constructorId, c]));
    const constrStandingsMap = new Map(constructorStandings.map(c => [c.constructorId, c]));

    // Joining races with seasons and circuits
    const racesJoined = races.map(race => {
        const season = seasonsMap.get(race.year) || {};
        const circuit = circuitsMap.get(race.circuitId) || {};
        return {
            ...race,
            ...season,
            ...circuit
        };
    });

    // Joining sprint results, results, and status
    const resultsJoined = results.map(result => {
        const sprintResult = sprintMap.get(result.driverId) || {};
        const statusInfo = statusMap.get(result.statusId) || {};
        return {
            ...result,
            ...sprintResult,
            ...statusInfo
        };
    });

    // Join constructors related data
    const constructorsJoined = constructors.map(constructor => {
        const constrResult = constrResultsMap.get(constructor.constructorId) || {};
        const constrStanding = constrStandingsMap.get(constructor.constructorId) || {};
        return {
            ...constructor,
            ...constrResult,
            ...constrStanding
        };
    });

    // Additional joins and processing as required...

    // Joining driver-related data with races, lap times, and pit stops
    const driverRelatedJoined = drivers.map(driver => {
        const lapTime = lapMap.get(driver.driverId) || {};
        const pitStop = pitMap.get(driver.driverId) || {};
        const race = racesJoined.find(r => r.driverId === driver.driverId) || {};
        return {
            ...driver,
            ...lapTime,
            ...pitStop,
            ...race
        };
    });

    // Joining constructor-related data with races and results
    const constructorRelatedJoined = constructorsJoined.map(constructor => {
        const race = racesJoined.find(r => r.constructorId === constructor.constructorId) || {};
        const result = resultsJoined.find(res => res.constructorId === constructor.constructorId) || {};
        return {
            ...constructor,
            ...race,
            ...result
        };
    });

    // Example of aggregating data for visualization
    const aggregatedData = driverRelatedJoined.reduce((acc, driver) => {
        // Example: aggregating total points
        const points = parseInt(driver.points) || 0;
        if (!acc[driver.driverId]) {
            acc[driver.driverId] = { ...driver, totalPoints: 0 };
        }
        acc[driver.driverId].totalPoints += points;
        return acc;
    }, {});

    // Aggregate and process data for visualization
    // Consider if this section is redundant or necessary based on your requirements
    const winsByDriver = drivers.map(driver => {
        const standing = standingsMap.get(driver.driverId) || {};
        const result = resultsMap.get(driver.driverId) || {};
        return {
            ...driver,
            ...standing,
            ...result
        };
    }).reduce((acc, driver) => {
        const wins = parseInt(driver.wins) || 0;
        acc[driver.driverId] = (acc[driver.driverId] || 0) + wins;
        return acc;
    }, {});

    // Decide which dataset to return or return both if needed
    // return { aggregatedData, winsByDriver };
    return aggregatedData; // or return winsByDriver; based on your requirement
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


// Define an asynchronous function to load and process data
async function loadDataAndProcess() {
    // Load each dataset using d3.csv. Await pauses execution until the dataset is fully loaded.
    const driverStandings = await d3.csv("driver_standings.csv");
    const drivers = await d3.csv("drivers.csv");
    const results = await d3.csv("results.csv");
    const qualifying = await d3.csv("qualifying.csv");
    const pitStops = await d3.csv("pit_stops.csv");
    const lapTimes = await d3.csv("lap_times.csv");
    const races = await d3.csv("races.csv");
    const sprintResults = await d3.csv("sprint_results.csv");
    const seasons = await d3.csv("seasons.csv");
    const status = await d3.csv("status.csv");
    const constructors = await d3.csv("constructors.csv");
    const constructorResults = await d3.csv("constructor_results.csv");
    const constructorStandings = await d3.csv("constructor_standings.csv");

    // Process the loaded data using a custom processData function
    // This function should handle the logic for joining and aggregating data from the loaded datasets
    const processedData = processData(driverStandings, drivers, results, qualifying, pitStops, lapTimes, races, sprintResults, seasons, status, constructors, constructorResults, constructorStandings);
    
    // Create a bar chart visualization using the processed data
    createBarChart(processedData);
}

// Call the loadDataAndProcess function to execute the data loading and processing
loadDataAndProcess();

