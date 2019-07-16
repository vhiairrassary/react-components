/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

const path = require('path');
const reactDocgenTypescript = require('react-docgen-typescript');
const reactDocgen = require('react-docgen');

/**
 * Package specific styleguide configuration
 * https://github.com/styleguidist/react-styleguidist/blob/master/docs/Configuration.md
 */
module.exports = {
  propsParser: reactDocgenTypescript.withCustomConfig(
    path.resolve(__dirname, '../../tsconfig.json'),
    {
      propFilter: props => {
        return props.parent.fileName.indexOf('node_modules') === -1;
      }
    }
  ).parse,
  resolver: reactDocgen.resolver.findAllComponentDefinitions,
  sections: [
    {
      name: '',
      content: '../../packages/theming/README.md'
    },
    {
      name: 'Focus visible',
      content: '../../packages/theming/src/examples/focus-visible.md'
    },
    {
      name: 'Palette',
      content: '../../packages/theming/src/examples/palette.md'
    },
    {
      name: 'Theme',
      content: '../../packages/theming/src/examples/theme.md'
    },
    {
      name: 'Components',
      components: '../../packages/theming/src/ThemeProvider/[A-Z]*.{ts|tsx}'
    },
    {
      name: 'Utils',
      components: '../../packages/theming/src/utils/*.ts'
    }
  ]
};
