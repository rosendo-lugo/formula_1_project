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