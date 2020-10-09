import React from 'react';

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
              console.log('result', result);
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
          {hour}:{minute}:{second}
        </div>
        <div className='timeweather__weather'>
          {error && <div>Error: {error.message}</div>}
          {!isLoaded && <div>Loading...</div>}
          {items && currentWeather && <div className='timeweather__wrapper'>
            <div className='timeweather__temp'>
              <img 
                className='timeweather__icon'
                src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
                alt='weather icon'
              />
              <span className='timeweather__degrees'>
                {Math.floor(items.main.temp - 273.15)}°
              </span>
            </div>
            <span className='timeweather__location'>
              {items.name}
            </span>
          </div>}
        </div>
      </div>
    )
  }
}

export default TimeWeather; 