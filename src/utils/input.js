/* eslint-disable import/prefer-default-export */
export const Action = {
  Left: 'Left',
  Right: 'Right',
  Rotate: 'Rotate',
  SlowDrop: 'SlowDrop',
  Quit: 'Quit',
  Pause: 'Pause',
  FastDrop: 'FastDrop',
  Start: 'Start',
};
export const Key = {
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  KeyQ: Action.Quit,
  KeyP: Action.Pause,
  Space: Action.FastDrop,
  Enter: Action.start,
};
export const keyTest = () => {

};
export const actionIsDrop = (action) => [Action.SlowDrop, Action.FastDrop].includes(action);
export const actionForKey = (keyCode) => Key[keyCode];
