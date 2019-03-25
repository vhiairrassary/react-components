/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import { injectGlobal } from 'styled-components';
import { MDXProvider } from '@mdx-js/tag';
import { ThemeProvider } from '@zendeskgarden/react-theming';

/* Include global Garden component styling */
// import '@zendeskgarden/css-bedrock';
import '@zendeskgarden/react-buttons/dist/styles.css';

/* stylelint-disable */
// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,Arial,sans-serif !important;
  }
`;
/* stylelint-enable */

/* Customize MDX component rendering */
/* eslint-disable jsx-a11y/heading-has-content */
// const CustomH1 = props => <h1 id={slugify(props.children, { lower: true })} {...props} />;
// const CustomH2 = props => <h2 id={slugify(props.children, { lower: true })} {...props} />;
/* eslint-enable jsx-a11y/heading-has-content */

// const components = {
//   h1: CustomH1,
//   h2: CustomH2
// };

const components = {};

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <MDXProvider components={components}>{element}</MDXProvider>
    </ThemeProvider>
  );
};
