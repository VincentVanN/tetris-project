import PropTypes from 'prop-types';
import './game.scss';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { isBrowser } from 'react-device-detect';
import useKeypress from 'react-use-keypress';
import gameover from '../../sound/gameover.mp3';
import { useGameOver } from '../../hooks/useGameOver';
import Menu from '../Menu/Menu';
import Tetris from '../Tetris/Tetris';
import Mute from '../Mute/Mute';
import Footer from '../Footer/Footer';
import { useGameStats } from '../../hooks/useGameStats';
import { useDropTime } from '../../hooks/useDropTime';

function Game({ rows, columns }) {
  const [playMusic, setplayMusic] = useState(true);
  const [clickMute, setclickMute] = useState(false);
  const [gameStats, addLinesCleared, setGameStats] = useGameStats();
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({ gameStats });
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const gameoverSound = new Audio(gameover);
  console.log(dropTime);
  const start = () => {
    resetGameOver();
  };
  useKeypress('Enter', () => {
    resetGameOver();
  });
  useEffect(() => {
    if (gameOver.isGameOver && gameOver.afterPlaying) {
      pauseDropTime();
      setplayMusic(false);
      gameoverSound.play();
      setTimeout(() => {
        setGameOver({ isGameOver: true, afterPlaying: false });
        setGameStats({
          level: 1,
          linesCompleted: 0,
          linesPerLevel: 5,
          points: 0,
        });
        if (!clickMute) {
          setplayMusic(true);
        }
      }, 4000);
    }
  }, [gameOver]);
  return (
    <div className="game">
      <motion.div
        className="gameOverWindow"
        initial={{ scale: 1 }}
        animate={{
          scale: gameOver.isGameOver && gameOver.afterPlaying ? 1 : 0,
        }}
        style={{
          zIndex: gameOver.isGameOver && gameOver.afterPlaying ? 11000 : -1,
        }}
      >
        <p className="gameOverWindow-text">GAME OVER</p>
        <p className="gameOverWindow-score">{`SCORE: ${gameStats.points}`}</p>
      </motion.div>
      {gameOver.isGameOver && !gameOver.afterPlaying ? (
        <>
          <Mute
            setplayMusic={setplayMusic}
            setclickMute={setclickMute}
            playMusic={playMusic}
            clickMute={clickMute}
          />
          <Menu
            onClick={start}
            playMusic={playMusic}
          />
          {isBrowser && (
          <Footer />
          )}

        </>
      )
        : (
          <>
            <Mute
              setplayMusic={setplayMusic}
              setclickMute={setclickMute}
              playMusic={playMusic}
              clickMute={clickMute}
            />
            <Tetris
              rows={rows}
              columns={columns}
              setGameOver={setGameOver}
              gameOver={gameOver}
              playMusic={playMusic}
              gameStats={gameStats}
              addLinesCleared={addLinesCleared}
              dropTime={dropTime}
              pauseDropTime={pauseDropTime}
              resumeDropTime={resumeDropTime}
            />
          </>
        )}
    </div>
  );
}
Game.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
};
export default Game;
