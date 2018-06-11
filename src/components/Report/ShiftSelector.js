import React from 'react';
import PropTypes from 'prop-types';
import '../../css/Report/ShiftSelector.css';

import { TimeFormat } from '../../common/common';

const ShiftSelector = ({ shiftList, handler }) => {
	const shifts = shiftList.filter(shift => {
		return shift.stage !== null;
	});

	const shiftOptions = shifts.map((shift, index) => {
		return (
			<option value={index} key={index}>
				{TimeFormat(new Date(shift.start))} - {TimeFormat(new Date(shift.end))}
			</option>
		);
	});

	return (
		<div className="shiftSelector">
			<select
				name="reportShift"
				onChange={e => handler(e)}
				defaultValue={shifts.length - 2}
			>
				{shiftOptions}
			</select>
		</div>
	);
};

ShiftSelector.propTypes = {
	shiftList: PropTypes.array.isRequired,
	handler: PropTypes.func.isRequired
};

export default ShiftSelector;
