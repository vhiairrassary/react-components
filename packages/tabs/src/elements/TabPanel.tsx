/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTabsContext } from './useTabsContext';
import StyledTabPanel from '../views/TabPanel';

interface ITabPanelProps {
  value: any;
}

/** Accepts all `<div>` props */
const TabPanel = ({ value, ...props }: ITabPanelProps) => {
  const tabsContext = useTabsContext();

  const currentIndex = tabsContext.currentPanelIndex;

  tabsContext.currentPanelIndex++;

  return (
    <StyledTabPanel
      {...tabsContext.getTabPanelProps({
        item: value,
        index: currentIndex,
        ...props
      })}
    />
  );
};

TabPanel.propTypes = {
  value: PropTypes.any
};

export default TabPanel;
