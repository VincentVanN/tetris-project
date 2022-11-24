import './boardCell.scss';
import PropTypes from 'prop-types';

function BoardCell({ cell, boardWidth }) {
  return (
    <div
      className={`boardCell ${cell.className}`}
      style={{
        width: boardWidth / 11,
        height: boardWidth / 11,
      }}
    />
  );
}
BoardCell.propTypes = {
  cell: PropTypes.object.isRequired,
  boardWidth: PropTypes.number,
};
BoardCell.defaultProps = {
  boardWidth: null,
};
export default BoardCell;
