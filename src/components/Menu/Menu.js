/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './menu.scss';
import { motion } from 'framer-motion';
import gameMenu from '../../sound/gameMenu.mp3';
import ParticlesComponent from '../Particles/ParticlesComponent';
import { particlesMenu } from '../../particles/particlesOptions';

function Menu({
  onClick,
  playMusic,
}) {
  const menuMusic = new Audio(gameMenu);
  const [isSeeControls, setIsSeeControls] = useState(false);
  useEffect(() => {
    if (playMusic) {
      menuMusic.loop = true;
      menuMusic.play();
    }
    return () => {
      menuMusic.loop = false;
      menuMusic.pause();
    };
  }, [playMusic]);
  return (
    <div className="menu">
      <div className="container">
        <div className="neon">Tetris </div>
        <div className="flux">Among Us</div>
      </div>
      <ParticlesComponent
        optionParticles={particlesMenu}
      />
      <motion.button
        type="button"
        className="button"
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        START
      </motion.button>
      <button
        type="button"
        className="seeControlsButton"
        onClick={() => setIsSeeControls(!isSeeControls)}
      >
        {isSeeControls ? 'Hide controls' : 'See controls?'}
      </button>
      {isSeeControls && (
        <div className="menu-control">
          <div>Left Arrow: Tetromino goes to the left.</div>
          <div>Right Arrow: Tetromino goes to the right.</div>
          <div>Arrow up: Rotate.</div>
          <div>Arrow down: Slow drop.</div>
          <div>Space: Fast drop.</div>
        </div>
      )}
    </div>
  );
}
Menu.propTypes = {
  onClick: PropTypes.func.isRequired,
  playMusic: PropTypes.bool.isRequired,
};

export default Menu;
