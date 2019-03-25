/* eslint-disable react/prop-types */
/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import Layout from './layout';
import Seo from './seo';

/**
 * Template for all content strategy files
 */
function ContentStrategyTemplate(props) {
  const {
    data: { mdx }
  } = props;

  return (
    <Layout>
      <h1>{mdx.frontmatter.title}</h1>
      {mdx.frontmatter.title && <Seo title={mdx.frontmatter.title} />}
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ContentStrategyPageQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      tableOfContents
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`;

export default ContentStrategyTemplate;
