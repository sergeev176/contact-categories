

import { Link } from 'react-router-dom';

import React from 'react';

const Header = () => {
    return (
        <header className='header'>
        <ul>
          <li><Link to='/'>home</Link></li>
          <li><Link to='/add'>add</Link></li>
          <li><Link to='/active'>active</Link></li>
          <li><Link to='/some'>some</Link></li>
        </ul>
      </header>
    );
}

export default Header;
