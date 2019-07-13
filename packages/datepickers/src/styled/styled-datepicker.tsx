/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { css, DefaultTheme, ThemeProps } from 'styled-components';
import { isRtl, retrieveComponentStyles, getColor } from '@zendeskgarden/react-theming';
import rgba from 'polished/lib/color/rgba';
import math from 'polished/lib/math/math';

const retrieveSpacing = ({ isSmall, theme }: { isSmall?: boolean; theme: DefaultTheme }) => {
  if (isSmall) {
    return theme.space.lg;
  }

  return theme.space.xl;
};

export const StyledDatepicker = styled.div<{
  isSmall: boolean;
}>`
  /* stylelint-disable */
  padding: ${props => (props.isSmall ? math(`${props.theme.space.lg} / 2`) : props.theme.space.md)};
  color: ${props => getColor({ hue: '__neutral', shade: 800, theme: props.theme })};

  direction: ${props => isRtl(props) && 'rtl'};

  ${props => retrieveComponentStyles('datepickers.datepicker', props)};
`;

export const StyledHeader = styled.div`
  display: flex;

  ${props => retrieveComponentStyles('datepickers.header', props)};
`;

export const StyledHeaderPaddle = styled.div<{ isSmall: boolean }>`
  width: ${retrieveSpacing};
  height: ${retrieveSpacing};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => getColor({ hue: '__neutral', shade: 600, theme: props.theme })};
  cursor: pointer;
  border-radius: 50%;

  :hover {
    color: ${props => getColor({ hue: '__neutral', shade: 800, theme: props.theme })};
    background-color: ${props =>
      rgba(getColor({ hue: '__primary', shade: 600, theme: props.theme }), 0.08)};
  }

  :active {
    background-color: ${props =>
      rgba(getColor({ hue: '__primary', shade: 600, theme: props.theme }), 0.2)};
    color: ${props => getColor({ hue: '__neutral', shade: 800, theme: props.theme })};
  }

  transform: ${props => isRtl(props) && 'rotate(180deg)'};

  * {
    width: ${props => math(`${props.theme.space.lg} / 2`)};
    height: ${props => math(`${props.theme.space.lg} / 2`)};
  }

  ${props => retrieveComponentStyles('datepickers.header_paddle', props)};
`;

const boldedStyling = css<{ isSmall: boolean }>`
  font-size: ${props => (props.isSmall ? props.theme.fontSizes.sm : props.theme.fontSizes.md)};
  font-weight: ${props => props.theme.fontWeights.semibold};
  line-height: ${props => props.theme.lineHeights.md};
`;

export const StyledHeaderLabel = styled.div<{ isSmall: boolean }>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${boldedStyling};

  ${props => retrieveComponentStyles('datepickers.header_label', props)};
`;

export const StyledCalendar = styled.div<{ isSmall?: boolean }>`
  width: ${props => math(`${retrieveSpacing(props)} * 7`)};

  ${props => retrieveComponentStyles('datepickers.calendar', props)};
`;

export const StyledCalendarItem = styled.div<{ isSmall?: boolean }>`
  display: inline-block;
  width: ${retrieveSpacing};
  height: ${retrieveSpacing};

  ${props => retrieveComponentStyles('datepickers.calendar_item', props)};
`;

export const StyledDayLabel = styled.div<{ isSmall: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  ${boldedStyling};

  ${props => retrieveComponentStyles('datepickers.day_label', props)};
`;

interface IStyledDayProps {
  isPreviousMonth?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  small: boolean;
}

const retrieveStyledDayColor = ({
  isDisabled,
  isSelected,
  isToday,
  isPreviousMonth,
  theme
}: IStyledDayProps & ThemeProps<DefaultTheme>) => {
  if (isDisabled) {
    return getColor({ hue: '__neutral', shade: 400, theme });
  }

  if (isSelected && !isDisabled) {
    return theme.palette.white;
  }

  if (isToday) {
    return 'inherit';
  }

  if (isPreviousMonth) {
    return getColor({ hue: '__neutral', shade: 600, theme });
  }

  return getColor({ hue: '__primary', shade: 600, theme });
};

const retrieveBackgroundColor = ({
  isSelected,
  isDisabled,
  theme
}: IStyledDayProps & ThemeProps<DefaultTheme>) => {
  if (isSelected && !isDisabled) {
    return getColor({ hue: '__primary', shade: 600, theme });
  }

  return 'inherit';
};

export const StyledDay = styled.div<IStyledDayProps>`
  cursor: ${props => (props.isDisabled ? 'inherit' : 'pointer')};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: ${props => (props.small ? props.theme.fontSizes.sm : props.theme.fontSizes.md)};
  font-weight: ${props =>
    props.isToday && !props.isDisabled ? props.theme.fontWeights.bold : 'inherit'};
  line-height: ${props => props.theme.lineHeights.md};
  color: ${retrieveStyledDayColor};
  background-color: ${retrieveBackgroundColor};

  ${props =>
    !props.isSelected &&
    !props.isDisabled &&
    `
  :hover {
    background-color: ${rgba(getColor({ hue: '__primary', shade: 600, theme: props.theme }), 0.08)};
    color: ${getColor({ hue: '__primary', shade: 800, theme: props.theme })};
  }

  :active {
    background-color: ${rgba(getColor({ hue: '__primary', shade: 600, theme: props.theme }), 0.2)};
    color: ${getColor({ hue: '__primary', shade: 800, theme: props.theme })};
  }
  `}

  ${props => retrieveComponentStyles('datepickers.day', props)};
`;
