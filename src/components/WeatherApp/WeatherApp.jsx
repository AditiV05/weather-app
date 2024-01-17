import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assests/search.png";
import clear_icon from '../Assests/clear.png';
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from '../Assests/drizzle.png';
import rain_icon from '../Assests/rain.png';
import snow_icon from '../Assests/snow.png';
import wind_icon from '../Assests/wind.png';
import humidity_icon from '../Assests/humidity.png';

const WeatherApp = () => {

    let api_key = "f9d0345063948019b64d24d8cf891e11";

    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");

        if(element.length===0 || element[0].value==="")
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percentage");
        const wind = document.getElementsByClassName("wind-rate");
        const temprature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

       if(humidity.length>0){
        humidity[0].innerHTML = data.main.humidity +" %";
       } 

       if(wind.length>0){
        wind[0].innerHTML = Math.floor(data.wind.speed) +" km/h";
       } 

       if(temprature.length>0){
        temprature[0].innerHTML = Math.floor(data.main.temp)+"°C";
       } 

       if(location.length>0){
        location[0].innerHTML = data.name;
       } 

       if(data.weather[0].icon==="01n" || data.weather[0].icon==="01d"){
        setWicon(clear_icon);
       }
       else if (data.weather[0].icon==="02n" || data.weather[0].icon==="02d"){
        setWicon(cloud_icon);
       }
       else if (data.weather[0].icon==="03n" || data.weather[0].icon==="03d"){
        setWicon(drizzle_icon);
       }
       else if (data.weather[0].icon==="04n" || data.weather[0].icon==="04d"){
        setWicon(drizzle_icon);
       }
       else if (data.weather[0].icon==="09n" || data.weather[0].icon==="09d"){
        setWicon(rain_icon);
       }
       else if (data.weather[0].icon==="10n" || data.weather[0].icon==="10d"){
        setWicon(rain_icon);
       }
       else if (data.weather[0].icon==="13n" || data.weather[0].icon==="13d"){
        setWicon(snow_icon);
       }
       else{
        setWicon(clear_icon);
       }

    }

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={()=>{search()}}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp"> 24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
