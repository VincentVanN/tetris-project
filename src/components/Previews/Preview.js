import React from 'react';
import './preview.scss';
import PropTypes from 'prop-types';
import { buildBoard } from '../../utils/boardUtils';
import BoardCell from '../BoardCell/BoardCell';
import { transferToBoard } from '../../utils/tetrominoes';

function Preview({ tetromino, index }) {
  const { shape, className } = tetromino;
  const board = buildBoard({ rows: 4, columns: 4 });
  const style = { top: `${index * 15} vw` };
  const generateKey = (x) => x + Date.now();
  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape,
  });
  return (
    <div className="preview" style={style}>
      <div className="preview-board">
        {board.rows.map((row) => row.map((cell, x) => (
          <BoardCell key={generateKey(x)} cell={cell} />
        )))}
      </div>
    </div>
  );
}
Preview.propTypes = {
  tetromino: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
export default React.memo(Preview);
