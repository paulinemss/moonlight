import React from 'react';
import { WiDaySunny,
WiNightClear,
WiDayCloudy,
WiNightAltCloudy,
WiCloud,
WiCloudy,
WiHail,
WiNightHail,
WiDayRain,
WiNightAltRain,
WiDayThunderstorm,
WiNightThunderstorm,
WiSnow,
WiFog } from 'react-icons/wi';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class TimeWeather extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentTime: new Date(),
      error: null,
      isLoaded: false,
      items: {}
    }

    this.tick = this.tick.bind(this)
    this.getFriendlyTime = this.getFriendlyTime.bind(this)
  }

  tick () {
    this.setState({
      currentTime: new Date()
    });
  }

  getFriendlyTime (num) {
    if (num < 10) {
      return '0' + num; 
    } else {
      return num; 
    }
  }

  componentDidMount () {
    const context = this;

    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );

    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
          .then(res => res.json())
          .then(
            (result) => {
              context.setState({
                isLoaded: true,
                items: result
              });
            },
            (error) => {
              context.setState({
                isLoaded: true,
                error
              });
            }
          )

      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );    
  }

  componentWillUnmount () {
    clearInterval(this.intervalID);
  }

  render () {
    const { error, isLoaded, items } = this.state;

    let hour = this.state.currentTime.getHours()
    let minute = this.state.currentTime.getMinutes()
    let second = this.state.currentTime.getSeconds()

    const currentWeather = items.weather ? items.weather[0] : null;

    hour = this.getFriendlyTime(hour); 
    minute = this.getFriendlyTime(minute);
    second = this.getFriendlyTime(second); 

    return (
      <div className='timeweather__main'>
        <div className='timeweather__clock'>
          <h2>{hour}:{minute}:{second}</h2>
        </div>
        <div className='timeweather__weather'>
          {error && <div>Error: {error.message}</div>}
          {!isLoaded && <div>Loading...</div>}
          {items && currentWeather && <div className='timeweather__wrapper'>
            <div className='timeweather__temp'>
              <div className='timeweather__icon'>
                {currentWeather.icon === '01d' && <WiDaySunny />}
                {currentWeather.icon === '01n' && <WiNightClear />}
                {currentWeather.icon === '02d' && <WiDayCloudy />}
                {currentWeather.icon === '02n' && <WiNightAltCloudy />}
                {currentWeather.icon === '03d' && <WiCloud />}
                {currentWeather.icon === '03n' && <WiCloud />}
                {currentWeather.icon === '04d' && <WiCloudy />}
                {currentWeather.icon === '04n' && <WiCloudy />}
                {currentWeather.icon === '09d' && <WiHail />}
                {currentWeather.icon === '09n' && <WiNightHail />}
                {currentWeather.icon === '10d' && <WiDayRain />}
                {currentWeather.icon === '10n' && <WiNightAltRain />}
                {currentWeather.icon === '11d' && <WiDayThunderstorm />}
                {currentWeather.icon === '11n' && <WiNightThunderstorm />}
                {currentWeather.icon === '13d' && <WiSnow />}
                {currentWeather.icon === '13n' && <WiSnow />}
                {currentWeather.icon === '50d' && <WiFog />}
                {currentWeather.icon === '50n' && <WiFog />}
              </div>
              <span className='timeweather__degrees'>
                {Math.floor(items.main.temp - 273.15)}°
              </span>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}

export default TimeWeather; 

// src={`http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}