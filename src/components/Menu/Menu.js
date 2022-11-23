/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
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
        <div className="flux">Clone</div>
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
    </div>
  );
}
Menu.propTypes = {
  onClick: PropTypes.func.isRequired,
  playMusic: PropTypes.bool.isRequired,
};

export default Menu;
