const weatherForm = document.querySelector('.location-form');
const searchLocation = document.querySelector('.location-input');

const locationMessage = document.querySelector('#location-p');
const forecastMessage = document.querySelector('#forecast-p');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchLocation.value;
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                locationMessage.textContent = data.error;
                forecastMessage.textContent = '';
            } else {
                locationMessage.textContent = data.location;
                forecastMessage.textContent = data.forecast;
            }
        })
    })
})