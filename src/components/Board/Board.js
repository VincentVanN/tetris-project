/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { isBrowser } from 'react-device-detect';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import BoardCell from '../BoardCell/BoardCell';
import './board.scss';

function Board({ board, isLvUp, setisLvUp }) {
  const [boardWidth, setboardWidth] = useState(0);
  const boardRef = useRef();
  const [width, height] = useWindowSize({ fps: 60 });
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
    width: isBrowser ? ((height * 0.75) / 2) : ((height * 0.9) / 2),
    height: isBrowser ? height * 0.75 : height * 0.9,
  };
  useEffect(() => {
    if (boardRef.current) {
      setboardWidth(boardRef.current.clientWidth);
    }
  }, [width]);
  useEffect(() => {
    if (isLvUp.active) {
      setTimeout(() => {
        setisLvUp({ ...isLvUp, active: false });
      }, 1500);
    }
  }, [isLvUp]);
  return (
    <div
      className={`board ${isBrowser ? 'browser' : ''}`}
      style={boardStyles}
      ref={boardRef}
    >
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
      {board.rows.map((row) => row.map((cell, x) => <BoardCell key={(x * board.size.columns) + x} cell={cell} boardWidth={boardWidth} />))}
    </div>
  );
}
Board.propTypes = {
  board: PropTypes.object.isRequired,
  isLvUp: PropTypes.object.isRequired,
  setisLvUp: PropTypes.func.isRequired,
};
export default Board;
