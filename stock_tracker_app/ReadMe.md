# Stock Tracker Dashboard

A responsive stock tracking dashboard that allows users to view real-time stock data, compare stock performance, and visualize stock price trends through an interactive mountain chart. The project is built using **HTML**, **CSS**, **JavaScript**, and integrates with the **Alpha Vantage API** to fetch live stock data.

## Features

- **Search for Stock Data**: Users can search for any stock by its symbol (e.g., AAPL, MSFT) to retrieve detailed information such as price, volume, and daily price changes.
- **Trending Stocks Dropdown**: A dropdown menu lists the top 5 trending stocks, allowing users to quickly view their current data and historical performance.
- **Mountain View Graph**: Stock prices are visualized in a mountain chart format using Chart.js, providing a clear visual representation of trends over time.
- **Compare Stocks**: A dynamic comparison table lets users compare multiple stocks based on price, price change, and volume.
- **Responsive Design**: The dashboard is fully responsive and adapts to different screen sizes, from desktop to mobile.

## Project Structure


- **index.html**: The main HTML file that contains the structure of the dashboard.
- **style.css**: The stylesheet for making the page responsive and visually appealing.
- **script.js**: JavaScript file to handle the logic, API requests, and updating the DOM dynamically.
- **README.md**: This documentation file.

## Technologies Used

- **HTML5**: For structuring the dashboard layout.
- **CSS3**: For styling and ensuring responsive design.
- **JavaScript**: For DOM manipulation, API requests, and interactivity.
- **Chart.js**: To display stock price trends as a mountain view graph.
- **Alpha Vantage API**: To fetch real-time stock information.

## Setup Instructions

To run this project on your local machine, follow these steps:

### 1. Clone the repository

git clone https://github.com/your-username/stock-tracker-dashboard.git

### 2. Open the project folder

cd stock-tracker-dashboard


### 3. Set up Alpha Vantage API Key
- Register at [Alpha Vantage](https://www.alphavantage.co/) to get a free API key.
- Replace the `your_alpha_vantage_api_key` placeholder in `script.js` with your actual API key.

### 4. Open the project in a browser
- Simply open the `index.html` file in your web browser to start using the dashboard.

## Usage

1. **Search for a Stock**: Enter a stock symbol (e.g., AAPL) in the search bar and click the "Search" button to retrieve and display the latest stock data.
2. **View Stock Chart**: After searching for a stock, a mountain view chart will be displayed, showcasing the stock's price trend.
3. **Compare Stocks**: Add multiple stocks to the comparison table to compare their prices, changes, and volumes.
4. **Use Trending Stocks Dropdown**: Select a stock from the dropdown to quickly view its data and performance.

## Dependencies

- **Chart.js**: Used for rendering the stock price charts. No additional installation is required as it is included via CDN in the HTML.
- **Alpha Vantage API**: Used to fetch real-time stock data. Make sure to add your API key to the `script.js` file.

## Example Screenshot

![Stock Tracker Dashboard Screenshot](screenshot.png)

## Future Improvements

- Add functionality to remove stocks from the comparison table.
- Integrate more advanced filtering and sorting options.
- Provide additional stock data, such as P/E ratio, dividend yield, etc.
- Add user authentication to save watchlists.

## License

This project is open-source and available under the [MIT License](LICENSE).