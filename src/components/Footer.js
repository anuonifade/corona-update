import React from 'react';

import Container from 'components/Container';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>&copy; { new Date().getFullYear() }, <a href="https://twitter.com/anuonifade" target="_blank">@anuonifade</a></p>
      </Container>
    </footer>
  );
};

export default Footer;
