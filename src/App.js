import React from 'react';
import Greeting from './components/Greeting';
import MoonCard from './components/MoonCard'; 
import Activities from './components/Activities';
import NextMoon from './components/NextMoon'; 
import TimeWeather from './components/TimeWeather'; 
import data from './data/moon';
import { getMoonPhase } from './helpers';
import { TiHeartOutline } from 'react-icons/ti';

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
    const month = this.state.now.getMonth() + 1;
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

        <div className='small-screen'>
          <Greeting 
            now={this.state.now}
          />
          <TimeWeather 
            now={this.state.now}
          />
          <div className='column column__moon'>
            <MoonCard
              moonPhase={this.state.moonPhase}
            >
              <h2>{data[this.state.moonPhase]["name"]}</h2>
              <h3>Focus: {data[this.state.moonPhase]["focus"]}</h3>
              <p>{data[this.state.moonPhase]["description"]}</p>
            </MoonCard>
            <div className='card__wrapper card__activities selector1'>
                <Activities 
                  now={this.state.now}
                  moonPhase={this.state.moonPhase}
                  todos={data[this.state.moonPhase]["todos"]}
                />
              </div>
            <div className='card__wrapper card__nextmoon'>
              <NextMoon
                now={this.state.now}
              /> 
            </div>
          </div>
          <div className='footer'>
              Built with <TiHeartOutline /> by <a 
                href='https://github.com/paulinemss' 
                rel='noopener noreferrer' 
                target='_blank'
              >
                Pauline Massé
              </a>.
            </div>
        </div>

        <div className='large-screen'>        
          <div className='column column__moon'>
            <MoonCard
              moonPhase={this.state.moonPhase}
            >
              <h2>{data[this.state.moonPhase]["name"]}</h2>
              <h3>Focus: {data[this.state.moonPhase]["focus"]}</h3>
              <p>{data[this.state.moonPhase]["description"]}</p>
            </MoonCard>
            <div className='card__wrapper card__nextmoon'>
              <NextMoon
                now={this.state.now}
              /> 
            </div>
          </div>
          <div className='column column__activities'>
            <div>
              <Greeting 
                now={this.state.now}
              />
              <TimeWeather 
                now={this.state.now}
              />
              <div className='card__wrapper card__activities'>
                <Activities 
                  now={this.state.now}
                  moonPhase={this.state.moonPhase}
                  todos={data[this.state.moonPhase]["todos"]}
                />
              </div>
            </div>
            <div className='footer'>
              Built with <TiHeartOutline /> by <a 
                href='https://github.com/paulinemss' 
                rel='noopener noreferrer' 
                target='_blank'
              >
                Pauline Massé
              </a>.
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
