/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CalloutStyles from '@zendeskgarden/css-callouts';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';

import Well from './Well';
const COMPONENT_ID = 'notifications.notification';

const VALIDATION = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info'
};

/**
 * Supports all `<div>` props
 */
const Notification = styled(Well).attrs(props => ({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION,
  floating: true,
  className: classNames(props.className, {
    // Validation types
    [CalloutStyles['c-callout--success']]: props.type === VALIDATION.SUCCESS,
    [CalloutStyles['c-callout--warning']]: props.type === VALIDATION.WARNING,
    [CalloutStyles['c-callout--error']]: props.type === VALIDATION.ERROR,
    [CalloutStyles['c-callout--info']]: props.type === VALIDATION.INFO
  })
}))`
  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

Notification.propTypes = {
  type: PropTypes.oneOf([VALIDATION.SUCCESS, VALIDATION.WARNING, VALIDATION.ERROR, VALIDATION.INFO])
};

/** @component */
export default Notification;
