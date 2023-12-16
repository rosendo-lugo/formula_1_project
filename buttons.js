<!DOCTYPE html>
<html>
<head>
    <title>Formula 1 Dashboard</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://d3js.org/d3.v6.min.js"></script>
</head>
<body>
    <div id="controls">
        <select id="data-selection">
            <option value="driverStandings">Driver Standings</option>
            <option value="results">Race Results</option>
            <option value="qualifying">Qualifying Results</option>
            <option value="pitStops">Pit Stops</option>
            <option value="lapTimes">Lap Times</option>
            <option value="sprintResults">Sprint Results</option>
            <option value="drivers">Drivers</option>
            <option value="seasons">Seasons</option>
            <option value="status">Status</option>
            <option value="races">Status</option>
            <option value="circuits">Circuits</option>
            <option value="constructors">Constructors</option>
            <option value="constructorStandings">Constructor Standings</option>
            <option value="constructorResults">Constructor Results</option>
            

        </select>
        <button onclick="updateVisualization()">Update Visualization</button>
    </div>
    <div id="chart"></div>

    <script src="script.js"></script>
</body>
</html>