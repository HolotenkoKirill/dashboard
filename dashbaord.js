// Make API request to retrieve data
const fetchData = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
    }
}

// Generate labels and data from fetched API data
const generateChartData = (data) => {
    const chartData = data;

    const pieLabels = chartData.map(user => `${user.name.first} ${user.name.last}`);
    const pieData = chartData.map(user => user.dob.age);

    const barLabels = chartData.map(user => `${user.name.first} ${user.name.last}`);
    const barData = chartData.map(user => user.location.postcode);

    const lineGraphLabels = chartData.map(user => `${user.name.first} ${user.name.last}`);
    const lineGraphData = chartData.map(user => user.registered.age);

    const lineChartLabels = chartData.map(user => `${user.name.first} ${user.name.last}`);
    const lineChartData = chartData.map(user => user.location.coordinates.latitude);

    return {
        pieLabels,
        pieData,
        barLabels,
        barData,
        lineGraphLabels,
        lineGraphData,
        lineChartLabels,
        lineChartData
    };
}

// Create pie chart
const createPieChart = (elementId, labels, data) => {
    var ctx = document.getElementById(elementId).getContext("2d");
    var chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56",
                    "#32cd32",
                    "#ba55d3",
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Create bar chart
const createBarChart = (elementId, labels, data) => {
    var ctx = document.getElementById(elementId).getContext("2d");
    var chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Postcode",
                data: data,
                backgroundColor: "#36a2eb",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Create line graph
const createLineGraph = (elementId, labels, data) => {
    var ctx = document.getElementById(elementId).getContext("2d");
    var chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Registered Age",
                data: data,
                borderColor: "#ff6384",
                fill: false,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Create line chart
const createLineChart = (elementId, labels, data) => {
    var ctx = document.getElementById(elementId).getContext("2d");
    var chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Latitude",
                data: data,
                borderColor: "#36a2eb",
                fill: false,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Update the dashboard with real data
const updateDashboard = async () => {
    const data = await fetchData();
    const chartData = generateChartData(data);

    createPieChart("pieChart", chartData.pieLabels, chartData.pieData);
    createBarChart("barChart", chartData.barLabels, chartData.barData);
    createLineGraph("lineGraph", chartData.lineGraphLabels, chartData.lineGraphData);
    createLineChart("lineChart", chartData.lineChartLabels, chartData.lineChartData);
}

// Update the dashboard initially
updateDashboard();