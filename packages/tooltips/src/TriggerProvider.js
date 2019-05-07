/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Reference } from 'react-popper';
import useTooltipContext from './utils/useTooltipContext';

/**
 * TODO
 */
function TriggerProvider({ refKey, children, ...triggerProps }) {
  const { getTriggerProps } = useTooltipContext();

  const triggerRefCallback = triggerProps[refKey];
  const childRefCallback = children.props[refKey];

  return (
    <Reference>
      {({ ref: popperReference }) =>
        React.cloneElement(React.Children.only(children), {
          ...getTriggerProps({
            ...triggerProps,
            ...children.props,
            [refKey]: childRef => {
              // Pass ref to popperJS for positioning
              popperReference(childRef);

              childRefCallback && childRefCallback(childRef);
              triggerRefCallback && triggerRefCallback(childRef);
            }
          })
        })
      }
    </Reference>
  );
}

TriggerProvider.propTypes = {
  children: PropTypes.any,
  refKey: PropTypes.string
};

TriggerProvider.defaultProps = {
  refKey: 'ref'
};

export default TriggerProvider;
