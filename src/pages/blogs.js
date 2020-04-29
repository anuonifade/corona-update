import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';

const BlogPage = () => {
  return (
    <Layout pageName="two">
      <Helmet>
        <title>Blogs and Articles</title>
      </Helmet>
      <Container type="content" className="text-center">
        <h1>Blogs and Articles</h1>
        <p>Welcome to Corona Virus Blogpost and Articles</p>
      </Container>
    </Layout>
  );
};

export default BlogPage;
