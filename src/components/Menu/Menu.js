/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';
import './menu.scss';
import { motion } from 'framer-motion';

function Menu({ onClick }) {
  return (
    <div className="menu">
      <motion.button
        type="button"
        className="button"
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
      >
        play Tetris
      </motion.button>
    </div>
  );
}
Menu.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Menu;
