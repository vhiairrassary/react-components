/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLProps } from 'react';
import { useTabsContext } from './useTabsContext';
import StyledTabList from '../views/TabList';

/** Accepts all `<div>` props */
const TabList = (props: HTMLProps<HTMLDivElement>) => {
  const { getTabListProps } = useTabsContext();

  return <StyledTabList {...getTabListProps(props)} />;
};

export default TabList;
