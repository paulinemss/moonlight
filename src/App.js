import React from 'react';
import Card from './components/Card';
import Greeting from './components/Greeting';
import Moon from './components/Moon';
import Activities from './components/Activities';

function App() {
  return (
    <div className='app'>
      <div className='column column__moon'>
        <Card>
          <Moon />
          <h2>Full Moon</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam justo, scelerisque non felis porta, placerat vestibulum nisi. Vestibulum ac elementum massa. In rutrum quis risus quis sollicitudin. Pellentesque non eros ante. Vestibulum sed tristique massa. Quisque et feugiat risus, eu tristique felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi.</p>
        </Card>
      </div>
      <div className='column'>
        <Greeting 
          username='Pauline'
        />
        <Card>
          <Activities />
        </Card>
        <Card>
          <h2>Next Full Moon</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam justo, scelerisque non felis porta, placerat vestibulum nisi. Vestibulum ac elementum massa.</p>
        </Card>
      </div>
    </div>
  );
}

export default App;
