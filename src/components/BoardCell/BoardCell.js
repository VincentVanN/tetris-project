import './boardCell.scss';
import PropTypes from 'prop-types';

function BoardCell({ cell }) {
  return (
    <div
      className={`boardCell ${cell.className}`}
    />
  );
}
BoardCell.propTypes = {
  cell: PropTypes.object.isRequired,
};
export default BoardCell;
