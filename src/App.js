import React from 'react';
import Greeting from './components/Greeting';
import MoonCard from './components/MoonCard'; 
import Activities from './components/Activities';
import data from './data/moon';
import { getMoonPhase } from './helpers';

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
          <div className='card__wrapper card__nextmoon'>
            <h2>Next Full Moon</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam justo.</p>
          </div>
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
        </div>
      </div>
    );
  }
}

export default App;
