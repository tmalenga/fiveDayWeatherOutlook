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
          .then(console.log(response));     
             
                      
          });
        
})