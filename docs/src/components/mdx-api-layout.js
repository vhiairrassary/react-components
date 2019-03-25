/* eslint-disable react/prop-types */
/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
// import { graphql } from 'gatsby';
// import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import Layout from './layout';
import Seo from './seo';

/**
 * Component for display API prop sheets
 */
function ComponentApiTemplate(props) {
  // const {
  //   data: { mdx }
  // } = props;

  // console.log(mdx.tableOfContents);

  // console.log(props.pageContext.docgen);

  return (
    <Layout>
      <h1>API</h1>
      <Seo title="Api" />
      {props.pageContext.docgen.map((component, index) => (
        <div key={`${index}-${component.displayName}`}>
          <h2>{component.displayName}</h2>
          <p>{component.description}</p>
          <table>
            <thead>
              <tr>
                <th>Prop name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(component.props).map(propKey => (
                <tr key={propKey}>
                  <td>{propKey}</td>
                  <td>{component.props[propKey].type.name}</td>
                  <td>TODO</td>
                  <td>{component.props[propKey].description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </Layout>
  );
}

export default ComponentApiTemplate;
