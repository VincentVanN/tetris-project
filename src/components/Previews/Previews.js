/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Preview from './Preview';

function Previews({ tetrominoes }) {
  const generateKey = (index) => index + Date.now();
  // we want all tetrominoes except the current
  const previewTetrominoes = tetrominoes.slice(1 - tetrominoes.length).reverse();
  return (
    <div className="previews">
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={generateKey(index)} />
      ))}
    </div>
  );
}
Previews.propTypes = {
  tetrominoes: PropTypes.array.isRequired,
};
export default React.memo(Previews);
