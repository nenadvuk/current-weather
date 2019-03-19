// API key 7e8b7c6f7ed3827a5d9d6646a7cb3b57


// Classes
class AjaxWeather {
    constructor() {
        // https://openweathermap.org/
        this.apiKey = '7e8b7c6f7ed3827a5d9d6646a7cb3b57';
    }
    // Method // Configuring API request
    async getWeather(city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=metric`;
        // Waiting for the fetch // Promise
        const weatherData = await fetch(url);
        const weather = await weatherData.json();
        return weather;
    }
}

// Displaying values form API
class Display {
    constructor(){
        this.results = document.querySelector('.results');
        this.cityName = document.getElementById('cityName');
        this.cityCountry = document.getElementById('cityCountry');
        this.cityIcon = document.getElementById('cityIcon');
        this.cityTemp = document.getElementById('cityTemp');
        this.cityHumidity = document.getElementById('cityHumidity');
    }
    showWeather(data){  // Response will be object // From the result, we are taking values we need
        const{name, sys:{country}, main:{temp, humidity}} = data;
        // Icons are in the array
        const {icon} = data.weather[0];

        this.results.classList.add('showItem');
        this.cityName.textContent = name;
        this.cityCountry.textContent = country;
        this.cityTemp.textContent = temp;
        this.cityHumidity.textContent = humidity;

        this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`

    }
}





(function () {

    const form = document.getElementById('weatherForm');
    const cityInput = document.getElementById('cityInput');
    const feedback = document.querySelector('.feedback');

    const ajax = new AjaxWeather()
    const display = new Display()
    form.addEventListener('submit', event => {
        // Preventing refreshing page after every submiting
        event.preventDefault();
        // Getting value back from input field
        const city = cityInput.value;
        // Empty field
        if (city.length === 0) {
            showFeedback('Search field cannot be empty')
        } else {
            // Method if user inserts some value to input form we are calling method  
            ajax.getWeather(city).then(data => {
                // Wrong city name
                if(data.message === 'city not found') {
                    showFeedback('There is now city in base with such name')
                } else { // Everything ok
                    display.showWeather(data);
                }
            }); 
        }
    });




    // Function showFeedback - It's called if there is empty field to submit
    function showFeedback(text) {
        feedback.classList.add('showItem');  // Adding
        feedback.innerHTML = `<p>${text}</p>` // Adding

        // Timeout for feedback and removing the class with warning
        setTimeout(() => {
            feedback.classList.remove('showItem')
        }, 2500)
    }

})();