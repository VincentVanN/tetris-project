/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import './app.scss';
import { useState } from 'react';
import Game from '../Game/Game';

function App() {
  const [enter, setEnter] = useState(false);
  return (

    <div className="app">
      {!enter
        ? (<button type="button" className="enterButton" onClick={() => setEnter(true)}>Enter</button>)
        : <Game rows={20} columns={10} />}

    </div>
  );
}

export default App;
