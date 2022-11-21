/* eslint-disable import/prefer-default-export */
export const Action = {
  Left: 'Left',
  Right: 'Right',
  Rotate: 'Rotate',
  SlowDrop: 'SlowDrop',
  Quit: 'Quit',
  Pause: 'Pause',
  Fastdrop: 'Fastdrop',
};
export const Key = {
  ArrowUp: Action.Rotate,
  ArraowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  KeyQ: Action.Quit,
  KeyP: Action.Pause,
  Space: Action.Fastdrop,
};
export const actionForKey = (keyCode) => Key[keyCode];
