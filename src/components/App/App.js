/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import './app.scss';
import { motion } from 'framer-motion';
import useKeypress from 'react-use-keypress';
import { useCallback, useEffect, useState } from 'react';
import Game from '../Game/Game';
import Loading from '../Loading/Loading';

function App() {
  const [enter, setEnter] = useState(false);
  const [loading, setloading] = useState(false);
  const handleEnter = useCallback(() => {
    setEnter(true);
    setloading(true);
  }, [enter]);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setloading(false);
      }, 3000);
    }
  }, [loading]);
  useKeypress('Enter', () => {
    setEnter(true);
    setloading(true);
  });
  return (

    <div className="app">
      {loading && (<Loading />)}
      {!enter
        ? (
          <motion.button
            type="button"
            className="enterButton"
            onClick={handleEnter}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            Enter
          </motion.button>
        )
        : <Game rows={20} columns={10} />}

    </div>
  );
}

export default App;
