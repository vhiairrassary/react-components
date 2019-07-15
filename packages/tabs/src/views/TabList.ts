/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { retrieveComponentStyles, getColor } from '@zendeskgarden/react-theming';

const COMPONENT_ID = 'tabs.tablist';

/**
 * Accepts all `<div>` props
 */
const TabList = styled.div.attrs({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})`
  /* 1. List element reset. */

  display: block;
  margin-top: 0; /* [1] */
  margin-bottom: ${props => props.theme.space.md};
  border-bottom: 1px ${props => props.theme.borderStyles.solid}
    ${props => getColor({ hue: '__neutral', shade: 300, theme: props.theme })};
  padding: 0; /* [1] */
  line-height: 20px;
  white-space: nowrap;
  color: ${props => getColor({ hue: '__neutral', shade: 600, theme: props.theme })};
  font-size: ${props => props.theme.fontSizes.md};

  :focus {
    outline: none;
  }

  ${props => retrieveComponentStyles('tabs.tab_list', props)};
`;

/** @component */
export default TabList;
