import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gameTypeA from '../../sound/amongus.mp3';
import { useBoard } from '../../hooks/useBoard';
import { usePlayer } from '../../hooks/usePlayer';
import Board from '../Board/Board';
import GameController from '../GameController/GameController';
import GameStats from '../GameStats/GameStats';
import Previews from '../Previews/Previews';
import './tetris.scss';
import ParticlesComponent from '../Particles/ParticlesComponent';
import { tetrisParticles } from '../../particles/particlesOptions';
import { useDropTime } from '../../hooks/useDropTime';

function Tetris({
  rows,
  columns,
  setGameOver,
  playMusic,
  gameOver,
  gameStats,
  addLinesCleared,
}) {
  const tetrisMusic = new Audio(gameTypeA);
  useEffect(() => {
    if (playMusic) {
      tetrisMusic.loop = true;
      tetrisMusic.play();
    }
    return () => {
      tetrisMusic.loop = false;
      tetrisMusic.pause();
    };
  }, [playMusic]);
  const [isStarted, setisStarted] = useState(false);
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [isLvUp, setisLvUp] = useState({ active: false, lvl: 1 });
  const [board] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats,
  });
  useEffect(() => {
    pauseDropTime();
    setTimeout(() => {
      setisStarted(true);
    }, 3500);
  }, [isStarted]);
  useEffect(() => {
    setTimeout(() => {
      resumeDropTime();
    }, 200);
  }, [isStarted]);
  useEffect(() => {
    if (gameOver.isGameOver) {
      pauseDropTime();
    }
  }, [gameOver]);
  //
  return (
    <div className="tetris">
      <motion.div
        className="starterWindow"
        initial={{ scale: 1 }}
        animate={{ scale: !isStarted ? 1 : 0 }}
      >
        <p className="starterWindow-text">let's go!!</p>
      </motion.div>

      <ParticlesComponent
        optionParticles={tetrisParticles}
      />

      <div className="boardContainer">
        <Board board={board} isLvUp={isLvUp} setisLvUp={setisLvUp} />
        <div className="rightPart">
          <Previews tetrominoes={player.tetrominoes} />
          <GameStats gameStats={gameStats} playMusic={playMusic} setisLvUp={setisLvUp} />
        </div>
      </div>
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
        dropTime={dropTime}
        pauseDropTime={pauseDropTime}
        resumeDropTime={resumeDropTime}
      />
    </div>
  );
}
Tetris.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  setGameOver: PropTypes.func.isRequired,
  playMusic: PropTypes.bool.isRequired,
  gameOver: PropTypes.object.isRequired,
  gameStats: PropTypes.object.isRequired,
  addLinesCleared: PropTypes.func.isRequired,
};
export default Tetris;
