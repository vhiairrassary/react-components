/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../../components/layout';
import Seo from '../../components/seo';

const ContentStrategyIndex = props => {
  // eslint-disable-next-line react/prop-types
  const { data } = props;
  const { edges: posts } = data.contentStrategyPages;

  return (
    <Layout>
      <Seo title="Content Strategy" />
      <h1>Content Strategy Home Page</h1>
      <ul>
        {posts.map(({ node: { childMdx: post } }) => (
          <li key={post.id}>
            <Link to={`content-strategy${post.fields.slug}`}>
              <h2>{post.frontmatter.title}</h2>
            </Link>
            <p>{post.timeToRead} minutes to read</p>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ContentStrategyIndexQuery {
    contentStrategyPages: allFile(filter: { sourceInstanceName: { eq: "content_strategy" } }) {
      edges {
        node {
          childMdx {
            id
            excerpt
            frontmatter {
              title
            }
            fields {
              slug
            }
            timeToRead
          }
        }
      }
    }
  }
`;

export default ContentStrategyIndex;
