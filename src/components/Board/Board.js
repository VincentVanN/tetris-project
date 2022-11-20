/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import BoardCell from '../BoardCell/BoardCell';
import './board.scss';

function Board({ board }) {
  console.log(board);
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
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
