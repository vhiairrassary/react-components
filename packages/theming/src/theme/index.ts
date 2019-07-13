/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { DefaultTheme } from 'styled-components';
import { borders, borderRadii, borderStyles, borderWidths } from './borders';
import { default as baseColors } from './colors';
import { fonts, fontSizes, fontWeights } from './fonts';
import { default as lineHeights } from './lineHeights';
import { shadows, shadowWidths } from './shadows';
import { default as space } from './space';
import { default as defaultPalette } from '../palette';

const palette = { ...defaultPalette };

/* Exclude product palette from the theme */
delete palette.product;

const theme: DefaultTheme = {
  rtl: false,
  borders,
  borderRadii,
  borderStyles,
  borderWidths,
  colors: {
    ...baseColors,
    base: 'light'
  },
  components: {},
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  palette,
  shadowWidths,
  shadows,
  space
};

export default theme;
