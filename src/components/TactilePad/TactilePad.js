import './tactilePad.scss';

function TactilePad() {
  const handleClick = (key) => {
    document.dispatchEvent(key.keyDown);
    setTimeout(() => {
      document.dispatchEvent(key.keyUp);
    }, 100);
  };
  const fastDrop = { keyDown: new KeyboardEvent('keydown', { code: 'Space' }), keyUp: new KeyboardEvent('keyup', { code: 'Space' }) };
  const left = { keyDown: new KeyboardEvent('keydown', { code: 'ArrowLeft' }), keyUp: new KeyboardEvent('keyup', { code: 'ArrowLeft' }) };
  const right = { keyDown: new KeyboardEvent('keydown', { code: 'ArrowRight' }), keyUp: new KeyboardEvent('keyup', { code: 'ArrowRight' }) };
  const slowDrop = { keyDown: new KeyboardEvent('keydown', { code: 'ArrowDown' }), keyUp: new KeyboardEvent('keyup', { code: 'ArrowDown' }) };
  const rotate = { keyDown: new KeyboardEvent('keydown', { code: 'ArrowUp' }), keyUp: new KeyboardEvent('keyup', { code: 'ArrowUp' }) };
  return (
    <div className="tactilePad">
      <div className="tactilePad-left">
        <div
          className="tactileButton"
          onClick={() => handleClick(left)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon pad" viewBox="0 0 512 512"><title>Arrow Back Circle</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M249.38 336L170 256l79.38-80M181.03 256H342" /><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /></svg>
        </div>
        <div
          className="tactileButton"
          onClick={() => handleClick(fastDrop)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon pad" fill="rgba(255, 255, 255, 0.7)" opacity="0.7" viewBox="0 0 512 512"><title>Caret Down</title><path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" /></svg>
        </div>
      </div>
      <div className="tactilePad-right">
        <div
          className="tactileButton"
          onClick={() => handleClick(slowDrop)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon pad" viewBox="0 0 512 512"><title>Arrow Down Circle</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M176 262.62L256 342l80-79.38M256 330.97V170" /><path d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /></svg>
        </div>
        <div
          className="tactileButton"
          onClick={() => handleClick(rotate)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon pad" viewBox="0 0 512 512"><title>Refresh Circle</title><path d="M288 193s12.18-6-32-6a80 80 0 1080 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="28" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="28" d="M256 149l40 40-40 40" /><path d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /></svg>
        </div>
        <div
          className="tactileButton"
          onClick={() => handleClick(right)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon pad" viewBox="0 0 512 512"><title>Arrow Forward Circle</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.62 336L342 256l-79.38-80M330.97 256H170" /><path d="M256 448c106 0 192-86 192-192S362 64 256 64 64 150 64 256s86 192 192 192z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /></svg>
        </div>
      </div>

    </div>
  );
}

export default TactilePad;
