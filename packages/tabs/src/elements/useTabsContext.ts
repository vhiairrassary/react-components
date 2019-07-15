/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { createContext, useContext } from 'react';

interface ITabsContext {
  selectedItem?: any;
  focusedItem?: any;
  getTabListProps: (props: any) => any;
  getTabProps: (props: any) => any;
  getTabPanelProps: (props: any) => any;
  currentTabIndex: number;
  currentPanelIndex: number;
  tabRefs: React.RefObject<HTMLDivElement>[];
}

export const TabsContext = createContext<ITabsContext | undefined>(undefined);

export const useTabsContext = () => {
  const tabsContext = useContext<ITabsContext>(TabsContext as any);

  if (tabsContext === undefined) {
    throw new Error('This component must be nested within a `Tabs` component');
  }

  return tabsContext;
};
