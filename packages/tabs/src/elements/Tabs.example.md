TODO FIX The `Tabs` component requires the following structure.

- All `children` require a unique `key` and a `label` to display
- Each `child` can have an optional `disabled` prop to disable selection
- Each `child` can have an optional `tabProps` prop to provide props to the Tab that is created

All elements proxy the props of their native DOM representations.

If this abstraction is not able to handle your use-case use the
[useTabs hook](https://garden.zendesk.com/react-containers/storybook/?path=/story/tabs-container--usetabs)
component with our presentation components.

### Uncontrolled Usage

```jsx
<Tabs>
  <TabList>
    <Tab value="tab-1">Tab 1</Tab>
    <Tab value="tab-2" disabled>
      Disabled Tab
    </Tab>
    <Tab value="tab-3">Tab 3</Tab>
  </TabList>
  <TabPanel value="tab-1">Tab 1 content</TabPanel>
  <TabPanel value="tab-3">Tab 3 content</TabPanel>
</Tabs>
```

### Vertical

```jsx
tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

<Tabs vertical>
  <TabList>
    {tabs.map(tab => (
      <Tab value={tab} key={tab}>
        {tab}
      </Tab>
    ))}
  </TabList>
  {tabs.map(tab => (
    <TabPanel value={tab} key={tab}>
      Vertical {tab} content
    </TabPanel>
  ))}
</Tabs>;
```

### Controlled Usage

```jsx
initialState = { selectedItem: 'tab-2' };

<Tabs selectedItem={state.selectedItem} onSelect={selectedItem => setState({ selectedItem })}>
  <TabList>
    <Tab value="tab-1">Tab 1</Tab>
    <Tab value="tab-2">Tab 2</Tab>
    <Tab value="tab-3">Tab 3</Tab>
  </TabList>
  <TabPanel value="tab-1">Tab 1 content</TabPanel>
  <TabPanel value="tab-2">Tab 2 content</TabPanel>
  <TabPanel value="tab-3">Tab 3 content</TabPanel>
</Tabs>;
```
