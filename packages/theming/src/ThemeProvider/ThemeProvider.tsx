/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from 'styled-components';
import { default as defaultTheme } from '../theme';

/** @component */
const ThemeProvider = (props: PropsWithChildren<{ theme: DefaultTheme }>) => {
  return <StyledThemeProvider theme={props.theme}>{props.children as any}</StyledThemeProvider>;
};

ThemeProvider.propTypes = {
  theme: PropTypes.any
};

ThemeProvider.defaultProps = {
  theme: defaultTheme
};

/** @component */
export default ThemeProvider;
