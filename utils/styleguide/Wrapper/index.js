/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ThemeProvider, defaultTheme } from '../../../packages/theming/src';

const StyledWrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.space.md};
  color: ${props => props.theme.colors.foreground};
`;

const Wrapper = ({ children }) => {
  let theme = defaultTheme;

  const isRtl = location.search.indexOf('isRtl') !== -1;
  const isDark = location.search.indexOf('isDark') !== -1;
  const isLight = location.search.indexOf('isLight') !== -1;

  if (isRtl) {
    theme = {
      ...defaultTheme,
      rtl: true
    };
  }

  if (isDark) {
    theme = {
      ...defaultTheme,
      borderRadii: {
        sm: '0',
        md: '0'
      },
      colors: {
        ...defaultTheme.colors,
        base: 'dark',
        background: '#333',
        foreground: 'white',
        primaryHue: '#ff0',
        neutralHue: 'invertedGrey'
      },
      palette: {
        ...defaultTheme.palette,
        invertedGrey: {
          800: '#f8f9f9',
          700: '#e9ebed',
          600: '#d8dcde',
          500: '#c2c8cc',
          400: '#87929d',
          300: '#68737d',
          200: '#49545c',
          100: '#2f3941'
        }
      },
      borderStyles: {
        solid: 'dashed'
      }
    };
  }

  if (isLight) {
    theme = {
      ...defaultTheme,
      borderRadii: {
        sm: '0',
        md: '0'
      },
      colors: {
        ...defaultTheme.colors,
        background: 'white',
        foreground: 'black',
        primaryHue: 'purple',
        neutralHue: 'grey'
      },
      borderStyles: {
        solid: 'dashed'
      }
    };
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledWrapper>{children}</StyledWrapper>
    </ThemeProvider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.any
};

export default Wrapper;
