let searchBtn = $(".search-btn");
let userIpnut = $("#userInp");
let url = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiKey = "5a74568b4d5114e452a53cc6921752df";
let city = document.getElementById("city-name")

$(function () {
    
    //searchBtn.addEventListener("click", function() {
    searchBtn.click(function(){
      
      let userInput = userIpnut.val();
      console.log(userInput)
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ userInput +"&units=metric&appid=5a74568b4d5114e452a53cc6921752df")
          .then(response =>{return response.json();})
          .then(currentWeather);              
                      
          });
        
          function currentWeather (response){
            //console.log(response);
            const { name } = response;
            const { icon, description } = response.weather[0];
            const { temp, humidity } = response.main;
            const { speed } = response.wind;
            //const { temp } = response.main;
            // city = `${response.name}`;
            // let tempEl = `${response.main.temp}`            
            console.log(name, icon, description, temp, humidity, speed);
            city.innerHTML = "<b>City</b>: " + name;
            document.getElementById("current-temp").innerHTML = "<b>Temperature</b>: " + temp + " °C";
            document.getElementById("current-wind").innerHTML = "<b>Wind speed</b>: " + speed + " mph";
            document.getElementById("current-humidity").innerHTML = "<b>Humidity</b>: "+ humidity + "%";            
        }
        
})