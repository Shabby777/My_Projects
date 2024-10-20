// script.js
const API_KEY = 'your_alpha_vantage_api_key';
let comparedStocks = {}; // Store the compared stocks

// Search and display stock data
document.getElementById('searchButton').addEventListener('click', async () => {
    const symbol = document.getElementById('stockSymbol').value.toUpperCase();
    if (symbol) {
        await fetchStockData(symbol);
    }
});

// Fetch stock data
async function fetchStockData(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data['Time Series (Daily)']) {
        displayStockData(data, symbol);
        updateChart(data);
        addToComparison(symbol, data);
    } else {
        alert('Stock not found');
    }
}

// Display stock data
function displayStockData(data, symbol) {
    const dailyData = data['Time Series (Daily)'];
    const latestDate = Object.keys(dailyData)[0];
    const latestData = dailyData[latestDate];

    document.getElementById('stockPrice').textContent = latestData['4. close'];
    document.getElementById('stockChange').textContent = (latestData['4. close'] - latestData['1. open']).toFixed(2);
    document.getElementById('stockVolume').textContent = latestData['5. volume'];
}

// Update Chart with Stock Price Trends
function updateChart(data) {
    const dailyData = data['Time Series (Daily)'];
    const dates = Object.keys(dailyData);
    const prices = dates.map(date => dailyData[date]['4. close']);

    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Stock Price',
                data: prices,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
            }
        }
    });
}

// Add stock data to comparison table
function addToComparison(symbol, data) {
    if (comparedStocks[symbol]) {
        alert(`${symbol} is already in the comparison.`);
        return;
    }

    const dailyData = data['Time Series (Daily)'];
    const latestDate = Object.keys(dailyData)[0];
    const latestData = dailyData[latestDate];

    const price = latestData['4. close'];
    const change = (latestData['4. close'] - latestData['1. open']).toFixed(2);
    const volume = latestData['5. volume'];

    comparedStocks[symbol] = { price, change, volume }; // Store stock data

    updateComparisonTable(); // Update the table with the new data
}

// Update the comparison table
function updateComparisonTable() {
    const tableBody = document.querySelector('#comparisonTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    Object.keys(comparedStocks).forEach(stockSymbol => {
        const stock = comparedStocks[stockSymbol];

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stockSymbol}</td>
            <td>${stock.price}</td>
            <td>${stock.change}</td>
            <td>${stock.volume}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Populate trending stocks dropdown
async function loadTrendingStocks() {
    const trendingStocks = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSLA'];
    const dropdown = document.getElementById('trendingDropdown');

    trendingStocks.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock;
        option.textContent = stock;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', function () {
        const selectedStock = this.value;
        fetchStockData(selectedStock);
    });
}

loadTrendingStocks();
