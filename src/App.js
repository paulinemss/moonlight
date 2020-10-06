import React from 'react';
import Greeting from './components/Greeting';
import MoonCard from './components/MoonCard'; 
import Activities from './components/Activities';
import data from './data/moon';

// function to calculate the current moon phase 

function getMoonPhase(year, month, day) {
  let c = 0;
  let e = 0;
  let jd = 0;
  let b = 0;

  if (month < 3) {
    year--;
    month += 12;
  }

  ++month;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09;
  jd /= 29.5305882; 
  b = parseInt(jd); 
  jd -= b; 
  b = Math.round(jd * 8);
  
  if (b >= 8 ) {
      b = 0; 
  }

  let currentMoon; 

  switch(b) {
    case 0: 
      currentMoon = 'newMoon';
      break;
    case 1:
      currentMoon = 'waxingCrescent';
      break;
    case 2: 
      currentMoon = 'firstQuarter';
      break;
    case 3: 
      currentMoon = 'waxingGibbous';
      break;
    case 4: 
      currentMoon = 'fullMoon';
      break;
    case 5:
      currentMoon = 'waningGibbous';
      break;
    case 6:
      currentMoon = 'lastQuarter';
      break;
    case 7:
      currentMoon = 'waningCrescent';
      break;
    default:
      currentMoon = 'Error'; 
  }

  return currentMoon; 
}

// main React component 

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      now: new Date(),
      moonPhase: null
    }
  }

  componentDidMount () {
    const year = this.state.now.getFullYear();
    const month = this.state.now.getMonth();
    const day = this.state.now.getDate(); 
    const currentMoon = getMoonPhase(year, month, day);

    this.setState({ 
      moonPhase: currentMoon
    })
  }

  render () {
    if (!this.state.moonPhase) return null;

    return (
      <div className='app'>
        <div className='column column__moon'>
          <MoonCard>
            <h2>{data[this.state.moonPhase]["name"]}</h2>
            <h3>Focus: {data[this.state.moonPhase]["focus"]}</h3>
            <p>{data[this.state.moonPhase]["description"]}</p>
          </MoonCard>
        </div>
        <div className='column'>
          <Greeting 
            now={this.state.now}
          />
          <div className='card__wrapper card__activities'>
            <Activities 
              now={this.state.now}
              moonPhase={this.state.moonPhase}
              todos={data[this.state.moonPhase]["todos"]}
            />
          </div>
          <div className='card__wrapper'>
            <h2>Next Full Moon</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam justo, scelerisque non felis porta, placerat vestibulum nisi. Vestibulum ac elementum massa.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
