/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Popper } from 'react-popper';
import { withTheme, isRtl } from '@zendeskgarden/react-theming';
import useTooltipContext from './utils/useTooltipContext';
import { getRtlPopperPlacement, getPopperPlacement } from './utils/gardenPlacements';
import { StyledTooltip } from './styled';

const SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  EXTRA_LARGE: 'extra-large'
};

const TYPE = {
  LIGHT: 'light',
  DARK: 'dark'
};

/**
 * TODO
 */
function Tooltip(props) {
  const { placement, popperModifiers, eventsEnabled, style: tooltipStyle, ...otherProps } = props;
  const { getTooltipProps, openTooltip, closeTooltip, tooltipRef, isVisible } = useTooltipContext();
  const scheduleUpdateRef = useRef(undefined);

  useEffect(() => {
    /**
     * Recalculate popper placement while open to allow animations to complete.
     * This must be ran every render to allow for the size of the tooltip to change
     * and still be placed correctly.
     **/
    if (isVisible) {
      scheduleUpdateRef.current && scheduleUpdateRef.current();
    }
  });

  const popperPlacement = isRtl(props)
    ? getRtlPopperPlacement(placement)
    : getPopperPlacement(placement);

  return (
    <Popper
      placement={popperPlacement}
      modifiers={popperModifiers}
      // Disable position updating on scroll events while menu is closed
      eventsEnabled={isVisible && eventsEnabled}
    >
      {({ ref: popperRef, style: popperStyle, scheduleUpdate, placement: currentPlacement }) => {
        let computedStyle = { ...popperStyle, ...tooltipStyle };

        scheduleUpdateRef.current = scheduleUpdate;

        if (!isVisible) {
          computedStyle = { ...computedStyle, zIndex: -1, visibility: 'hidden' };
        }

        return (
          <StyledTooltip
            {...getTooltipProps({
              innerRef: ref => {
                tooltipRef.current = ref;

                popperRef(ref);
              },
              onFocus: () => openTooltip(),
              onBlur: () => closeTooltip(0),
              placement: currentPlacement,
              style: computedStyle,
              ...otherProps
            })}
          />
        );
      }}
    </Popper>
  );
}

Tooltip.propTypes = {
  popperModifiers: PropTypes.object,
  eventsEnabled: PropTypes.bool,
  style: PropTypes.object,
  /**
   * These placements differ from the default naming of Popper.JS placements to help
   * assist with RTL layouts.
   **/
  placement: PropTypes.oneOf([
    'auto',
    'top',
    'top-start',
    'top-end',
    'end',
    'end-top',
    'end-bottom',
    'bottom',
    'bottom-start',
    'bottom-end',
    'start',
    'start-top',
    'start-bottom'
  ]),
  arrow: PropTypes.bool,
  size: PropTypes.oneOf([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE, SIZE.EXTRA_LARGE]),
  type: PropTypes.oneOf([TYPE.LIGHT, TYPE.DARK]),
  children: PropTypes.node
};

Tooltip.defaultProps = {
  placement: 'top',
  arrow: true,
  type: TYPE.DARK,
  eventsEnabled: true
};

export default withTheme(Tooltip);
