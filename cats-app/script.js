const catContainer = document.getElementById('cat-container');
const getCatBtn = document.getElementById('get-cat-btn');

getCatBtn.addEventListener('click', async () => {
  const apiKey = 'live_WLsCaLyseaslvecg2TFIxv6myIEDrovdzBaIr0hLl349aQ3rC80UqrGwdbwaRG1d'; // Replace with your actual API key
  const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=1&size=med`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'x-api-key': apiKey
      }
    });
    const data = await response.json();
    const catImage = data[0].url;

    const imageElement = document.createElement('img');
    imageElement.src = catImage;
    catContainer.appendChild(imageElement);
  } catch (error) {
    console.error('Error fetching cat image:', error);
  }
});


