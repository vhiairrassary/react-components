```jsx
const { createGlobalStyle } = require('styled-components');

const GlobalStyling = createGlobalStyle`
  .focus-visible {
    color: red !important;
  }
`;

const useFocusVisible = require('../utils/useFocusVisible').default;

const Example = () => {
  const ref = React.useRef();
  useFocusVisible({ ref });

  return (
    <div ref={ref}>
      <GlobalStyling />
      <input />
      <button>focus me</button>
    </div>
  );
};

<Example />;
```
