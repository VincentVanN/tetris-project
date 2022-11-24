import React from 'react';
import './footer.scss';

function Footer() {
  return (
    <div
      className="footer"

    >
      <div className="footer-text">
        Powered with React by Vinc VanN. This fan website is training, not created for profit
      </div>
      <a href="https://github.com/VincentVanN/tetris-project" target="blank">
        <img className="footer-logo" src="/github-logo.svg" alt="github" />
      </a>
    </div>
  );
}

export default React.memo(Footer);
