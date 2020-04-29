import React from 'react';
import { Link } from 'gatsby';

import Container from 'components/Container';

const Header = () => {
  return (
    <header>
      <Container type="content">
        <p><Link to="/">Corona Virus Update</Link></p>
        <ul>
          <li>
            <Link to="/blogs/">Blog</Link>
          </li>
          <li>
            <Link to="/news/">News and Update</Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
