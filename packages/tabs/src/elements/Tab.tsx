/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTabsContext } from './useTabsContext';
import StyledTab from '../views/Tab';

interface ITabProps {
  value: any;
  disabled?: boolean;
}

/** Accepts all `<div>` props */
const Tab = ({ value, disabled, ...props }: ITabProps) => {
  const tabsContext = useTabsContext();

  if (disabled) {
    return <StyledTab disabled isVertical={tabsContext.isVertical} {...props} />;
  }

  const currentIndex = tabsContext.currentTabIndex;

  tabsContext.currentTabIndex++;

  const ref = React.createRef<HTMLDivElement>();

  return (
    <StyledTab
      {...tabsContext.getTabProps({
        item: value,
        index: currentIndex,
        ref,
        focusRef: ref,
        selected: tabsContext.selectedItem === value,
        focused: tabsContext.focusedItem === value,
        ...props
      })}
    />
  );
};

Tab.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool
};

export default Tab;
