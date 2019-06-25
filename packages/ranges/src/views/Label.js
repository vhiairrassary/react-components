/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import { retrieveComponentStyles, isRtl } from '@zendeskgarden/react-theming';
import RangeStyles from '@zendeskgarden/css-forms/dist/range.css';

const COMPONENT_ID = 'ranges.label';

/**
 * Accepts all `<label>` props
 */
const Label = styled.label.attrs(props => ({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION,
  className: classNames(RangeStyles['c-range__label'], {
    [RangeStyles['c-range__label--regular']]: props.regular,
    [RangeStyles['c-range__label--sm']]: props.small,

    // RTL
    [RangeStyles['is-rtl']]: isRtl(props)
  })
}))`
  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

Label.propTypes = {
  regular: PropTypes.bool,
  small: PropTypes.bool
};

Label.hasType = () => Label;

/** @component */
export default Label;
