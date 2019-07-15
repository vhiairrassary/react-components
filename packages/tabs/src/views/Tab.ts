/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';
import math from 'polished/lib/math/math';
import rgba from 'polished/lib/color/rgba';
import { retrieveComponentStyles, getColor } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'tabs.tab';

interface ITabProps {
  hovered?: boolean;
  focused?: boolean;
  active?: boolean;
  disabled?: boolean;
  selected?: boolean;
}

// ${props =>
//   !props.focused &&
//   `
// :focus::before {
//   box-shadow: none !important;
// }
// `}

/**
 * Accepts all `<div>` props
 */
const Tab = styled.div.attrs<ITabProps>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<ITabProps>`
  display: inline-block;
  position: relative;
  transition: color 0.25s ease-in-out;
  border-width: ${props => props.theme.borderWidths.md};
  border-bottom-style: solid;
  border-bottom-color: transparent;
  cursor: pointer;
  padding: 10px 28px ${props => math(`10px - ${props.theme.borderWidths.md} - 1px`)};
  overflow: hidden; /* [1] */
  vertical-align: top; /* [2] */
  user-select: none;
  text-align: center;
  text-decoration: none; /* [3] */
  text-overflow: ellipsis; /* [1] */
  color: inherit; /* [3] */

  ${props =>
    !props.disabled &&
    `
    :hover {
      color: ${getColor({ hue: '__primary', shade: 600, theme: props.theme })};
    }
  `};

  :focus {
    outline: none;
    text-decoration: none;
  }

  ${props =>
    props.focused &&
    `
    color: ${getColor({ hue: '__primary', shade: 600, theme: props.theme })};

    ::before {
      position: absolute;
      top: 10px;
      right: ${math('28px - 4px')};
      left: ${math('28px - 4px')};
      border-radius: ${props.theme.borderRadii.md};
      box-shadow: inset ${props.theme.shadows.sm(
        rgba(getColor({ hue: '__primary', shade: 600, theme: props.theme }), 0.35)
      )};
      height: ${props.theme.space.md};
      pointer-events: none;
    }
  `};

  ${props =>
    props.active &&
    `
    border-color: currentColor;
    color: ${getColor({ hue: '__primary', shade: 600, theme: props.theme })};

    ::before {
      box-shadow: none;
    }
  `};

  ${props =>
    props.selected &&
    `
    border-color: currentColor;
    color: ${getColor({ hue: '__primary', shade: 600, theme: props.theme })};
  `}

  ${props =>
    props.disabled &&
    `
  border-color: transparent;
  cursor: default;
  color: ${getColor({ hue: '__neutral', shade: 400, theme: props.theme })};
  `}

  ::before {
    transition: var(box-shadow 0.1s ease-in-out);
    content: '';
  }

  ${props => retrieveComponentStyles('tabs.tab', props)};
` as React.FunctionComponent<ITabProps>;

Tab.propTypes = {
  hovered: PropTypes.bool,
  focused: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool
};

/** @component */
export default Tab;
