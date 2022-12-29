let searchBtn = document.getElementById("search-btn");
let userIpnut = $("#userInp");
let url = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiKey = "5a74568b4d5114e452a53cc6921752df";
let city = document.getElementById("city-name")
//let currentTemp = document.getElementById("#current-temp")

 //console.log(city)


 //let arrayPreviousData = Object.entries(cityData); 


$(function () {
    displayHistory()
    //searchBtn.addEventListener("click", function() {
    searchBtn.addEventListener("click", () => {
      //console.log(userIpnut)//committ here... 
      searchWeather()        

                      
          })
          async function searchWeather(city){

            let userInput = city || userIpnut.val();
            //console.log(userInput)
            let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+ userInput +"&units=metric&appid=5a74568b4d5114e452a53cc6921752df")
                data = await response.json();
                currentWeather(data); 
            let res = await fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ userInput +"&units=metric&appid=5a74568b4d5114e452a53cc6921752df");
                resp = await res.json();
      
                forecastWeather(resp);
                $("div").removeClass("container-forecaste")
                let cityData = JSON.parse(localStorage.getItem("City_Data"))||[];
                if(!cityData.includes(userInput)){
                  cityData.push(userInput);
                  localStorage.setItem("City_Data", JSON.stringify(cityData));
                  displayHistory()
                }

        }
        function displayHistory(){

            cityData = JSON.parse(localStorage.getItem("City_Data"))||[];
            let historyEL = document.getElementById("history");
            historyEL.innerHTML = " ";

            for(i=0; i<cityData.length; i++){
                let button = document.createElement("button");
                button.innerText = cityData[i];
                button.classList.add("history")
                button.addEventListener("click", function(event){
                    searchWeather(event.target.innerText);
                })
                historyEL.appendChild(button);
            }


        }

        function currentWeather (data){
            //console.log(response);
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            //const { temp } = response.main;
            // city = `${response.name}`;
            // let tempEl = `${response.main.temp}`            
            console.log(name, icon, description, temp, humidity, speed);
            city.innerHTML = "<b>City</b>: " + name;
            document.getElementById("current-temp").innerHTML = "<b>Temperature</b>: " + temp + " °C";
            document.getElementById("current-wind").innerHTML = "<b>Wind speed</b>: " + speed + " mph";
            document.getElementById("current-humidity").innerHTML = "<b>Humidity</b>: "+ humidity + "%";            
        }

        async function forecastWeather(resp){
            console.log(resp);
            let cityName = resp.city.name;
            //let temp_1 = resp.list[0].main.temp;
            let humidity_1 = resp.list[0].main.humidity;
            let speed_1 = resp.list[0].wind.speed;
            
            let date_1= resp.list[0].dt_txt.slice(0,11);

            console.log(humidity_1 +" "+ date_1 +" "+ speed_1)
            
            // console.log(cityName, temp_1)
            // document.getElementById("temp-1").innerHTML = resp.list[0].main.temp; 
            
            let counter = 0;
            for(i = 7; i<40; i+=7){                
                //console.log(tempVal+ " °C" + "temp-" + (counter + 1) +" "+ i)
                document.getElementById("date-" + (counter + 1)).innerHTML = resp.list[i].dt_txt.slice(0,11); 
                counter++;

            }

            counter = 0;
            for(i = 7; i<40; i+=7){                
                document.getElementById("img" + (counter + 1)).src="http://openweathermap.org/img/wn/" +resp.list[i].weather[0].icon
                +".png";
                counter++;

            }

            counter = 0;
            for(i = 7; i<40; i+=7){                
                //console.log(resp.list[counter].main.temp)
                let tempVal = resp.list[i].main.temp
                console.log(tempVal+ " °C" + "temp-" + (counter + 1) +" "+ i)
                document.getElementById("temp-" + (counter + 1)).innerHTML = "Temperature: "+ tempVal + " °C"; 
                counter++;

            }
            
            counter = 0;
            for(i = 7; i<40; i+=7){                
                //console.log(tempVal+ " °C" + "temp-" + (counter + 1) +" "+ i)
                document.getElementById("wind-" + (counter + 1)).innerHTML = "Wind: "+ resp.list[i].wind.speed + " mph"; 
                counter++;

            }

            counter = 0;
            for(i = 7; i<40; i+=7){                
                //console.log(tempVal+ " °C" + "temp-" + (counter + 1) +" "+ i)
                document.getElementById("humidity-" + (counter + 1)).innerHTML = "Humidity: "+ resp.list[i].main.humidity+ " %"; 
                counter++;

            }


                
        }



    //     searchBtn.click(function(){
    //         let userInput = userIpnut.val();
    //         console.log(userInput)
    //           fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ userInput +"&units=metric&appid=5a74568b4d5114e452a53cc6921752df")
                
    //             .then(response => response.json())
    //             .then(data => {forecastWeather()
    //                 console.log(data);
    //                 let cityName = data.city.name;
    //                 let temp_1 = data.list[0].main.temp;
    //                 let humidity_1 = data.list[0].main.humidity + "%";
    //                 let speed_1 = data.list[0].wind.speed + "mph";
    //                 let icon_1 = data.list[0].weather[0].icon;
    //                 console.log(cityName + " "+ temp_1 + " " + humidity_1 + " "+ speed_1 + " " + icon_1);

    //                 for(i=0; i<40;i+=8){
    //                     counter=0;
    //                     document.getElementById("temp-"+counter).innerHTML = data.list[0].main.temp;
    //                 }
        
    //             })

    //         function forecastWeather(response){
    //             console.log("!!!!!!!!!!!" + response)

    //         }

     
        

    // })
})