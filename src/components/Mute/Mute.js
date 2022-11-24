import PropTypes from 'prop-types';
import { useCallback } from 'react';
import './mute.scss';

function Mute({
  setplayMusic, setclickMute, clickMute, playMusic,
}) {
  const handleClick = useCallback(() => {
    setplayMusic(!playMusic);
    setclickMute(!clickMute);
  });
  return (
    <div
      className="mute"
      onClick={handleClick}
    >
      {clickMute && (
        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Volume High</title><path d="M126 192H56a8 8 0 00-8 8v112a8 8 0 008 8h69.65a15.93 15.93 0 0110.14 3.54l91.47 74.89A8 8 0 00240 392V120a8 8 0 00-12.74-6.43l-91.47 74.89A15 15 0 01126 192zM320 320c9.74-19.38 16-40.84 16-64 0-23.48-6-44.42-16-64M368 368c19.48-33.92 32-64.06 32-112s-12-77.74-32-112M416 416c30-46 48-91.43 48-160s-18-113-48-160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
      )}
      {!clickMute && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        viewBox="0 0 75 75"
        strokeWidth="5"
        className="ionicon"
        fill="none"
        stroke="currentColor"
      >
        <path d="m39,14-17,15H6V48H22l17,15z" fill="#111" strokeLinejoin="round" />
        <path d="m49,26 20,24m0-24-20,24" fill="none" strokeLinecap="round" />
      </svg>
      )}
    </div>
  );
}
Mute.propTypes = {
  setplayMusic: PropTypes.func.isRequired,
  setclickMute: PropTypes.func.isRequired,
  clickMute: PropTypes.bool.isRequired,
  playMusic: PropTypes.bool.isRequired,
};
export default Mute;
