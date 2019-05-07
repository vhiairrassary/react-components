/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Manager } from 'react-popper';
import { useTooltip } from '@zendeskgarden/container-tooltip';

export const TooltipContext = React.createContext(undefined);

/**
 * Provides accessibility properties to containing tooltips.
 */
function TooltipProvider({ isVisible, delayMilliseconds, children }) {
  const tooltipRef = useRef(null);
  const tooltipProps = useTooltip({
    tooltipRef,
    isVisible,
    delayMilliseconds
  });

  return (
    <Manager>
      <TooltipContext.Provider value={{ tooltipRef, ...tooltipProps }}>
        {children}
      </TooltipContext.Provider>
    </Manager>
  );
}

TooltipProvider.propTypes = {
  isVisible: PropTypes.bool,
  delayMilliseconds: PropTypes.number,
  children: PropTypes.node
};

TooltipProvider.defaultProps = {
  delayMilliseconds: 500
};

export default TooltipProvider;
