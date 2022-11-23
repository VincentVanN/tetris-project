/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { useWindowSize } from '@react-hook/window-size/throttled';
import BoardCell from '../BoardCell/BoardCell';
import './board.scss';

function Board({ board }) {
  const [width] = useWindowSize({ fps: 60 });
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
    width: width / 5,
    height: width / 2.5,
  };
  return (
    <div className="board" style={boardStyles}>
      {board.rows.map((row) => row.map((cell, x) => <BoardCell key={(x * board.size.columns) + x} cell={cell} />))}
    </div>
  );
}
Board.propTypes = {
  board: PropTypes.object.isRequired,
};
export default Board;
