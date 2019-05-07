```jsx
const { Button } = require('@zendeskgarden/react-buttons/src');

<TooltipProvider>
  <TriggerProvider refKey="innerRef">
    <Button>Sample trigger</Button>
  </TriggerProvider>
  <Tooltip>Hello world</Tooltip>
</TooltipProvider>;
```
