/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { retrieveComponentStyles, isRtl } from '@zendeskgarden/react-theming';
import TabList from './TabList';
import Tab from './Tab';
import TabPanel from './TabPanel';

const COMPONENT_ID = 'tabs.tabs_view';

interface ITabsViewProps {
  vertical?: boolean;
}

/**
 * Accepts all `<div>` props
 */
const TabsView = styled.div.attrs<ITabsViewProps>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<ITabsViewProps>`
  display: block;
  overflow: hidden;

  ${props =>
    props.vertical &&
    `
    display: table;

    ${TabList} {
      display: table-cell;
      margin-bottom: 0;
      border-bottom: none;
      vertical-align: top;
    }

    ${Tab} {
      display: block;
      margin-bottom: ${props.theme.space.md};
      border-bottom-style: none;
      border-left-style: solid;
      border-left-color: transparent;
      padding: ${props.theme.space.xxs} ${props.theme.space.xs};
      text-align: left;

      ${
        isRtl(props)
          ? `
        margin-left: 0;
        border-left: 0;
        border-right-style: solid;
        border-right-color: transparent;
        text-align: right;
      `
          : ''
      }
    }

    ${Tab}:last-of-type {
      margin-bottom: 0;
    }

    ${TabPanel} {

      vertical-align: top;

      ${
        isRtl(props)
          ? `
        margin-right: ${props.theme.space.lg};
      `
          : `margin-left: ${props.theme.space.lg};`
      }
    }
  `}

  ${props => isRtl(props) && `direction: rtl;`}

  ${props => retrieveComponentStyles('tabs.tabs', props)};
` as React.FunctionComponent<ITabsViewProps>;

TabsView.propTypes = {
  /**
   * Displays vertical TabList styling
   */
  vertical: PropTypes.bool
};

/** @component */
export default TabsView;
