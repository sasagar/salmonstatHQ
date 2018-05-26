import React from 'react';
import PropTypes from 'prop-types';

import SalmonStat from './Stat/SalmonStat';
import ReportForm from './Report/ReportForm';
import '../css/SalmonStatHQ.css';

const SalmonStatHQ = ({
	shiftList,
	dataset,
	stats,
	info,
	onButtonPlus,
	onButtonMinus,
	onButtonPlus10,
	onButtonMinus10,
	tab
}) => {
	const view = () => {
		switch (tab) {
		case 'Report':
			return (
				<ReportForm
					className="ReportForm"
					shiftList={shiftList}
					dataset={dataset}
					stats={stats}
					info={info}
				/>
			);

		case 'List':
			return <div />;

		default:
			return (
				<SalmonStat
					className="SalmonStat"
					shiftList={shiftList}
					dataset={dataset}
					stats={stats}
					info={info}
					onButtonPlus={onButtonPlus}
					onButtonMinus={onButtonMinus}
					onButtonPlus10={onButtonPlus10}
					onButtonMinus10={onButtonMinus10}
				/>
			);
		}
	};
	return <div className="SalmonStatHQ">{view()}</div>;
};

SalmonStatHQ.propTypes = {
	shiftList: PropTypes.array.isRequired,
	dataset: PropTypes.number.isRequired,
	stats: PropTypes.array.isRequired,
	info: PropTypes.object.isRequired,
	onButtonPlus: PropTypes.func.isRequired,
	onButtonMinus: PropTypes.func.isRequired,
	onButtonPlus10: PropTypes.func.isRequired,
	onButtonMinus10: PropTypes.func.isRequired,
	tab: PropTypes.string.isRequired
};

export default SalmonStatHQ;
