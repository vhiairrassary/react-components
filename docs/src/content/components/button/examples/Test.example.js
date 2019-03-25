/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { ButtonGroup, Button } from '@zendeskgarden/react-buttons';

/**
 * This is an example component
 */
export default function TestComponent() {
  return (
    <ButtonGroup>
      <Button key="button-1">Item 1</Button>
      <Button key="button-2">Item 2</Button>
      <Button key="button-3">Item 3</Button>
    </ButtonGroup>
  );
}
