/* eslint-disable react/prop-types */
/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { graphql, Link } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import Layout from './layout';
import Seo from './seo';

/**
 * Template for all component pages
 */
function ComponentTemplate(props) {
  const {
    data: { mdx }
  } = props;

  return (
    <Layout>
      <h1>{mdx.frontmatter.component}</h1>
      <ul>
        {props.data.relatedPages.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={`components${node.childMdx.fields.slug}`}>
              {node.childMdx.frontmatter.title}{' '}
              {node.childMdx.id === props.pageContext.id && '(CURRENT PAGE)'}
            </Link>
          </li>
        ))}
      </ul>
      {mdx.frontmatter.title && <Seo title={mdx.frontmatter.title} />}
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ComponentLayoutPageQuery($id: String, $relativeDirectory: String) {
    mdx(id: { eq: $id }) {
      id
      tableOfContents
      frontmatter {
        title
        component
      }
      code {
        body
      }
    }
    relatedPages: allFile(
      filter: {
        sourceInstanceName: { eq: "components" }
        relativeDirectory: { eq: $relativeDirectory }
        extension: { eq: "md" }
      }
    ) {
      edges {
        node {
          id
          childMdx {
            id
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`;

export default ComponentTemplate;
