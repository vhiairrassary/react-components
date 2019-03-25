/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ThemeProvider } from '@zendeskgarden/react-theming';

const StyledExampleWrapper = styled.div`
  border: #000 4px solid;
  padding: 18px;

  direction: ${({ isRtl }) => (isRtl ? 'rtl' : 'ltr')};
`;

/**
 * A (soon to be) live code editor for React examples
 */
function CodeExample({ code, children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <div>
      <ThemeProvider rtl={isRtl}>
        <StyledExampleWrapper isRtl={isRtl}>{children}</StyledExampleWrapper>
      </ThemeProvider>
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? 'Hide' : 'Show'} Code
      </button>
      <button
        onClick={() => {
          setIsRtl(!isRtl);
        }}
      >
        {isRtl ? 'Disable' : 'Enable'} RTL
      </button>
      {isExpanded && (
        <code>
          <pre>{code}</pre>
        </code>
      )}
    </div>
  );
}

CodeExample.propTypes = {
  code: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default CodeExample;
