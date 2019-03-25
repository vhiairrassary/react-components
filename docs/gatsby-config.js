/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Garden Design System',
    description:
      'Building products for better customer relationships is complicated, but crafting beautifully simple web components doesn’t have to be. Welcome to our curated collection of UI goodness, the Zendesk Garden. The Garden is where we grow user interface components for Zendesk products.',
    author: '@zendesk'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-transformer-json',
      options: {
        typeName: 'Json'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content_strategy',
        path: `${__dirname}/src/content/content-strategy`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'components',
        path: `${__dirname}/src/content/components`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'react_packages',
        path: path.resolve(__dirname, '../packages/'),
        ignore: ['**/.*', '**/*.spec.js', '**/dist', '**/*.md', '**/*.json', '**/*.config.js']
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Garden Design System',
        short_name: 'garden',
        start_url: '/',
        background_color: '#144A75',
        theme_color: '#144A75',
        icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-styled-components'
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {}
          }
        ],
        defaultLayouts: {
          default: require.resolve('./src/components/layout.js')
        },
        globalScope: `
          import CodeExample from 'components/CodeExample';

          export default { CodeExample };
        `
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
};
