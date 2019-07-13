The `<Datepicker>` takes a native `Date()` object as its input. It is able to
accept several varieties of user input to parse it's date. By default it
allows the standard `Date.parse()` formats, including:

- `09/04/1986`
- `Sep 4, 1986`
- `September 4th, 1986`

These values are localized and will change their format based on the provided locale.
This logic may be customized with the `customParseDate` prop to allow more advanced
date parsing with [momentjs](https://momentjs.com/) or [date-fns](https://date-fns.org/).

```jsx
const { Field, Label, Input } = require('@zendeskgarden/react-forms/src');
const { ThemeProvider, defaultTheme } = require('@zendeskgarden/react-theming/src');

initialState = {
  value: new Date()
};

const tealTheme = { ...defaultTheme, colors: { ...defaultTheme.colors, primaryHue: 'teal' } };
const lemonTheme = { ...defaultTheme, colors: { ...defaultTheme.colors, primaryHue: 'lemon' } };

const base = 3;

const tinySpace = {
  base,
  xxs: `${base}px`,
  xs: `${base * 2}px`,
  sm: `${base * 3}px`,
  md: `${base * 5}px`,
  lg: `${base * 8}px`,
  xl: `${base * 10}px`,
  xxl: `${base * 12}px`
};

const superTinyTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primaryHue: 'crimson'
  },
  space: tinySpace
};

<ThemeProvider theme={defaultTheme}>
  <Field>
    <Label>Select a date</Label>
    <Datepicker value={state.value} onChange={newDate => setState({ value: newDate })}>
      <Input />
    </Datepicker>
  </Field>
</ThemeProvider>;
```
