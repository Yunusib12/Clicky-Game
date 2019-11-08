import React from 'react';
import './Navbar.css';

const Navbar = props => (
    <div className="navbar ">
        <div className="navTitle">Clicky Game</div>
        <div className={props.messageColor}>{props.message}</div>
        <div>
            Score: {props.score} <span className="pipe">|</span> High Score: {props.highScore}
        </div>
    </div>
);

export default Navbar;