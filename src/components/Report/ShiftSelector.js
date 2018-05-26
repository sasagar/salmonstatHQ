import React from 'react';
import PropTypes from 'prop-types';
import '../../css/Report/ShiftSelector.css';

import { TimeFormat } from '../../common/common';

const ShiftSelector = ({ shiftList, handler }) => {
	const shifts = shiftList.filter(shift => {
		return shift.stage !== null;
	});

	return (
		<div className="ShiftSelector">
			{TimeFormat(new Date(shifts[shifts.length - 2].start))} -{' '}
			{TimeFormat(new Date(shifts[shifts.length - 2].end))}
		</div>
	);
};

ShiftSelector.propTypes = {
	shiftList: PropTypes.array.isRequired,
	handler: PropTypes.func.isRequired
};

export default ShiftSelector;
