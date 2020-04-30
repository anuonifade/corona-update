import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';

const BlogPage = () => {
  return (
    <Layout pageName="two">
      <Helmet>
        <title>Corona Virus Articles</title>
      </Helmet>
      <Container type="content" className="text-center">
        <h1>COVID-19 Articles</h1>
        <p>Welcome to COVID-19 related Articles</p>
      </Container>
    </Layout>
  );
};

export default BlogPage;
