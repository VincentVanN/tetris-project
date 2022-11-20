/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { buildBoard } from '../utils/boardUtils';

export const useBoard = ({ rows, columns }) => {
  const [board] = useState(buildBoard({ rows, columns }));
  return [board];
};
