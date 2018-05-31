import React from 'react';
import PropTypes from 'prop-types';
import '../../css/List/List.css';

import {
	AvailCheck,
	TimeFormat,
	eSpt,
	norma,
	result,
	resultGetter
} from '../../common/common';

const List = ({ shiftList, stats, weaponList, tabSet }) => {
	if (
		typeof shiftList !== 'undefined' &&
		typeof stats !== 'undefined' &&
		shiftList.length !== 0
	) {
		const length = stats.length;
		const listReverse = shiftList.slice().reverse();

		const eachStat = start => {
			let eachData = stats.filter(stat => {
				const dateStart = new Date(stat.period);
				const timeStart = dateStart.getTime() / 1000;
				return timeStart === start;
			});
			eachData = eachData.reverse();
			const res = eachData.map((each, index) => {
				const weapon = num => {
					if (each.waveList.length >= num) {
						let res;

						if (each.waveList[num - 1].weaponId === -1) {
							return <div />;
						} else if (each.waveList[num - 1].weaponId < 9999) {
							const weaponId = weaponList.filter(weapon => {
								return weapon.id === each.waveList[num - 1].weaponId;
							});
							res = <img src={weaponId[0].image} alt={weaponId[0].name} />;
						} else {
							const weaponId = weaponList.filter(weapon => {
								return weapon.id === each.waveList[num - 1].randomId;
							});
							if (weaponId[0].id > 9999) {
								const src = require(`../../${weaponId[0].image}`);
								res = <img src={src} alt={weaponId[0].name} />;
							} else {
								res = <img src={weaponId[0].image} alt={weaponId[0].name} />;
							}
						}
						return res;
					}
				};
				const waveResult = num => {
					if (each.waveList.length >= num) {
						return (
							AvailCheck(each.waveList[num - 1].result) +
							'/' +
							AvailCheck(each.waveList[num - 1].norma)
						);
					} else {
						return '--/--';
					}
				};
				const resultFlagObj = resultGetter(each);
				const resultClass = 'result' + resultFlagObj.resultId;
				return (
					<div
						className="eachResult"
						key={index}
						onClick={() => tabSet(length - index - 1)}
					>
						<span className="id">#{each.id}</span>
						<span className={resultClass}>{result(each)}</span>
						<span className="gold">
							{each.sumGold}/{norma(each)}
						</span>
						<span className="red">{AvailCheck(each.sumRed)}</span>
						<span className="wave">
							{weapon(1)}
							{waveResult(1)}
						</span>
						<span className="wave">
							{weapon(2)}
							{waveResult(2)}
						</span>
						<span className="wave">
							{weapon(3)}
							{waveResult(3)}
						</span>
						<span className="eSpt">{eSpt(each)}</span>
					</div>
				);
			});
			return res;
		};

		const weaponListing = shift => {
			const res = shift.weapons.map((weapon, index) => {
				return (
					<div className="weapon" key={index}>
						<img src={weapon.image} alt={weapon.name} />
					</div>
				);
			});
			return res;
		};

		const shiftComponents = listReverse.map((shift, index) => {
			const startTime = new Date(shift.start);
			const now = new Date(Date.now());
			if (startTime.getTime() < now.getTime()) {
				return (
					<div className="eachShift" key={index}>
						<div className="Heading">
							<h3>
								{TimeFormat(new Date(shift.start))} -{' '}
								{TimeFormat(new Date(shift.end))}
							</h3>
							<div className="stageInfo">
								<div className="stageName">{shift.stage.name}</div>
								<div className="weapons">{weaponListing(shift)}</div>
							</div>
						</div>
						<div className="stageStats">{eachStat(shift.start_t)}</div>
					</div>
				);
			}
		});

		return <div className="List">{shiftComponents}</div>;
	} else {
		return <div className="List" />;
	}
};

List.propTypes = {
	shiftList: PropTypes.array.isRequired,
	stats: PropTypes.array.isRequired
};

export default List;
