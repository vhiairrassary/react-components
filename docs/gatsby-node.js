/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const fs = require('fs');
const path = require('path');
// const reactDocgen = require('react-docgen');
const { createFilePath } = require('gatsby-source-filesystem');

/**
 * Create docgen values for each component within filepath
 */
// function retrieveDocgenValues(filePath) {
//   const jsonValues = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
//   const components = [];

//   jsonValues.components.forEach(componentPath => {
//     components.push(reactDocgen.parse(fs.readFileSync(path.resolve(componentPath), 'utf-8')));
//   });

//   return components;
// }

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
  });
};

/**
 * Add automatic slug generation if no frontmatter is provided
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    let value = node.frontmatter.slug;

    if (!value) {
      value = createFilePath({ node, getNode });
    }

    createNodeField({
      name: 'slug',
      node,
      value
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            contentStrategyPages: allFile(
              filter: { sourceInstanceName: { eq: "content_strategy" } }
            ) {
              edges {
                node {
                  id
                  childMdx {
                    id
                    fields {
                      slug
                    }
                  }
                }
              }
            }
            componentPages: allFile(
              filter: { sourceInstanceName: { eq: "components" }, extension: { eq: "md" } }
            ) {
              edges {
                node {
                  id
                  relativeDirectory
                  childMdx {
                    id
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          // eslint-disable-next-line no-console
          console.error(result.errors);
          reject(result.errors);
        }

        result.data.contentStrategyPages.edges.forEach(({ node }) => {
          createPage({
            path: `content-strategy${node.childMdx.fields.slug}`,
            component: path.resolve(`./src/components/mdx-layout.js`),
            context: { id: node.childMdx.id }
          });
        });

        result.data.componentPages.edges.forEach(({ node }) => {
          createPage({
            path: `components${node.childMdx.fields.slug}`,
            component: path.resolve(`./src/components/mdx-component-layout.js`),
            context: { id: node.childMdx.id, relativeDirectory: node.relativeDirectory }
          });
        });
      })
    );
  });
};
