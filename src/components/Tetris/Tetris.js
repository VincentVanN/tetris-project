import PropTypes from 'prop-types';
import { useEffect } from 'react';
import gameTypeA from '../../sound/gameTypeA.mp3';
import { useBoard } from '../../hooks/useBoard';
import { useGameStats } from '../../hooks/useGameStats';
import { usePlayer } from '../../hooks/usePlayer';
import Board from '../Board/Board';
import GameController from '../GameController/GameController';
import GameStats from '../GameStats/GameStats';
import Previews from '../Previews/Previews';
import './tetris.scss';
import ParticlesComponent from '../Particles/ParticlesComponent';
import { tetrisParticles } from '../../particles/particlesOptions';

function Tetris({
  rows,
  columns,
  setGameOver,
  playMusic,
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
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [gameStats, addLinesCleared] = useGameStats();
  const [board] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });

  return (
    <div className="tetris">
      <ParticlesComponent
        optionParticles={tetrisParticles}
      />
      <Board board={board} />
      <GameStats gameStats={gameStats} playMusic={playMusic} />
      <Previews tetrominoes={player.tetrominoes} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
}
Tetris.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  setGameOver: PropTypes.func.isRequired,
  playMusic: PropTypes.bool.isRequired,
};
export default Tetris;
