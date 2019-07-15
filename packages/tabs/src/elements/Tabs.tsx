/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLProps, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import { withTheme, isRtl } from '@zendeskgarden/react-theming';
import { useTabs } from '@zendeskgarden/container-tabs';

import StyledTabsView from '../views/TabsView';

import { TabsContext } from './useTabsContext';
import { DefaultTheme, ThemeProps } from 'styled-components';

interface ITabsProps extends ThemeProps<DefaultTheme>, HTMLProps<HTMLDivElement> {
  vertical?: boolean;
  selectedItem?: any;
  focusedItem?: any;
  onSelect?: (selectedItem: any) => void;
  onFocus?: (focusedItem: any) => void;
}

const Tabs = ({
  vertical,
  children,
  selectedItem,
  focusedItem,
  onSelect,
  onFocus,
  ...other
}: PropsWithChildren<ITabsProps>) => {
  const {
    selectedItem: tabsSelectedItem,
    focusedItem: tabsFocusedItem,
    getTabListProps,
    getTabProps,
    getTabPanelProps
  } = useTabs({
    vertical,
    rtl: isRtl(other),
    selectedItem,
    focusedItem,
    onSelect,
    onFocus
  });

  return (
    <TabsContext.Provider
      value={{
        selectedItem: tabsSelectedItem,
        focusedItem: tabsFocusedItem,
        getTabListProps,
        getTabProps,
        getTabPanelProps,
        currentTabIndex: 0,
        currentPanelIndex: 0,
        tabRefs: []
      }}
    >
      <StyledTabsView vertical={vertical} {...other}>
        {children}
      </StyledTabsView>
    </TabsContext.Provider>
  );
};

Tabs.propTypes = {
  vertical: PropTypes.bool,
  selectedItem: PropTypes.any,
  focusedItem: PropTypes.any,
  onSelect: PropTypes.func,
  onFocus: PropTypes.func
};

Tabs.defaultProps = {
  vertical: false
};

/** @component */
export default withTheme(Tabs);
