function createBarChart(data) {
    // Set dimensions and margins for the chart
    const margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // Append SVG object to the chart div
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.category)) // Replace 'category' with the relevant column name
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.someNumericValue)]) // Use the numeric attribute
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.category)) // Replace 'category' with the relevant column name
        .attr("y", d => y(d.someNumericValue))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.someNumericValue))
        .attr("fill", "#69b3a2");
}

// Loading and parsing the data from driver_standings.csv
d3.csv("driver_standings.csv").then(function(data) {
    // Parse and clean your data here
    // For example, converting strings to numbers
    data.forEach(d => {
        d.points = +d.points; // Assuming 'points' is a column in your CSV
    });

    // Call createBarChart with the parsed data
    createBarChart(data);
});
