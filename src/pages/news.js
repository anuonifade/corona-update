import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';

const NewsPage = () => {
  return (
    <Layout pageName="two">
      <Helmet>
        <title>News Updates</title>
      </Helmet>
      <Container type="content" className="text-center">
        <h1>News Update</h1>
        <p>Welcome to Corona Virus Verified News update</p>
      </Container>
    </Layout>
  );
};

export default NewsPage;
