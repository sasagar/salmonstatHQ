import React from 'react';
import PropTypes from 'prop-types';

import SalmonStat from './Stat/SalmonStat';
import ReportForm from './Report/ReportForm';
import List from './List/List';
import FileReader from './FileReader/FileReader';
import coopWeapon from '../json/coopWeapon.json';

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
	tab,
	tabSet,
	onFormSubmit,
	onChange,
	reload
}) => {
	const view = () => {
		let weaponTmpList = [];

		shiftList.forEach(shift => {
			weaponTmpList = weaponTmpList.concat(shift.weapons);
		});

		weaponTmpList = weaponTmpList.concat(coopWeapon);
		weaponTmpList = weaponTmpList.filter(v => v);
		weaponTmpList = weaponTmpList.sort((a, b) => {
			return a.id < b.id ? -1 : 1;
		});
		let weaponList = [];
		weaponTmpList.forEach(weapon => {
			weaponList[weapon.id] = weapon;
		});
		weaponList = weaponList.filter(v => v);

		switch (tab) {
		case 'Report':
			return (
				<ReportForm
					className="ReportForm"
					shiftList={shiftList}
					dataset={dataset}
					stats={stats}
					info={info}
					weaponList={weaponList}
					reload={reload}
				/>
			);

		case 'List':
			return (
				<List
					className="List"
					shiftList={shiftList}
					stats={stats}
					weaponList={weaponList}
					tabSet={tabSet}
				/>
			);

		case 'FileReader':
			return (
				<FileReader
					className="FileReader"
					onFormSubmit={onFormSubmit}
					onChange={onChange}
				/>
			);

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
					weaponList={weaponList}
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
	tab: PropTypes.string.isRequired,
	tabSet: PropTypes.func.isRequired,
	onFormSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	reload: PropTypes.func.isRequired
};

export default SalmonStatHQ;
