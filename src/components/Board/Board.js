/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import BoardCell from '../BoardCell/BoardCell';
import './board.scss';

function Board({ board, isLvUp, setisLvUp }) {
  const [width] = useWindowSize({ fps: 60 });
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
    width: width / 5,
    height: width / 2.5,
  };
  useEffect(() => {
    if (isLvUp.active) {
      setTimeout(() => {
        setisLvUp({ ...isLvUp, active: false });
      }, 1500);
    }
  }, [isLvUp]);
  return (
    <div className="board" style={boardStyles}>
      <motion.div
        className="lvlUp"
        initial={{ scale: 0 }}
        animate={{
          scale: isLvUp.active ? 1 : 0,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        <motion.p
          animate={{
            rotate: isLvUp.active ? 360 : 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          {`Level ${isLvUp.lvl}`}
        </motion.p>
      </motion.div>
      {board.rows.map((row) => row.map((cell, x) => <BoardCell key={(x * board.size.columns) + x} cell={cell} />))}
    </div>
  );
}
Board.propTypes = {
  board: PropTypes.object.isRequired,
  isLvUp: PropTypes.object.isRequired,
  setisLvUp: PropTypes.func.isRequired,
};
export default Board;
