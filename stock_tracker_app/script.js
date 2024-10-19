// script.js
const API_KEY = 'your_alpha_vantage_api_key';

// Search and display stock data
document.getElementById('searchButton').addEventListener('click', async () => {
    const symbol = document.getElementById('stockSymbol').value.toUpperCase();
    if (symbol) {
        fetchStockData(symbol);
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
