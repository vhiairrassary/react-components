/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import PaginationStyles from '@zendeskgarden/css-pagination';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';

import Page from './Page';
const COMPONENT_ID = 'pagination.gap';

/**
 * Accepts all `<li>` props
 */
const Gap = styled(Page).attrs(props => ({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION,
  className: classNames(props.className, PaginationStyles['c-pagination__page--gap'])
}))`
  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

Gap.propTypes = {
  current: PropTypes.bool,
  focused: PropTypes.bool,
  hovered: PropTypes.bool,
  hidden: PropTypes.bool
};

/** @component */
export default Gap;
