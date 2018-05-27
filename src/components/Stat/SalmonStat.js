import React from 'react';
import PropTypes from 'prop-types';
import '../../css/Stat/SalmonStat.css';

import StageWeaponList from './StageWeaponList';
import Waves from './Waves';
import Button from './Button';
import { AvailCheck, TimeFormat } from '../../common/common';

const SalmonStat = ({
	shiftList,
	dataset,
	stats,
	info,
	onButtonPlus,
	onButtonMinus,
	onButtonPlus10,
	onButtonMinus10,
	weaponList
}) => {
	if (
		typeof shiftList !== 'undefined' &&
		typeof stats !== 'undefined' &&
		shiftList.length !== 0
	) {
		const period = new Date(stats[dataset].period);
		const stage = shiftList.filter(data => {
			let res = false;
			if (data.start_t === period.getTime() / 1000) {
				res = true;
			}
			return res;
		});

		return (
			<div className="SalmonStat">
				<Button
					minus10={onButtonMinus10}
					minus={onButtonMinus}
					plus10={onButtonPlus10}
					plus={onButtonPlus}
				/>
				<Stats
					stat={stats[dataset]}
					shift={stage[0]}
					period={period}
					info={info}
					weaponList={weaponList}
				/>
				<Button
					minus10={onButtonMinus10}
					minus={onButtonMinus}
					plus10={onButtonPlus10}
					plus={onButtonPlus}
				/>
			</div>
		);
	} else {
		return <div className="SalmonStat" />;
	}
};

SalmonStat.propTypes = {
	shiftList: PropTypes.array.isRequired,
	dataset: PropTypes.number.isRequired,
	stats: PropTypes.array.isRequired,
	info: PropTypes.object.isRequired,
	onButtonPlus: PropTypes.func.isRequired,
	onButtonMinus: PropTypes.func.isRequired,
	onButtonPlus10: PropTypes.func.isRequired,
	onButtonMinus10: PropTypes.func.isRequired
};

const Stats = ({ stat, shift, period, info, weaponList }) => {
	const end = new Date(shift.end);
	const result = () => {
		const resLength = stat.waveList.length;
		if (stat.waveList[resLength - 1].success) {
			return 'Clear!';
		} else {
			if (stat.waveList[resLength - 1].death) {
				return 'Wave ' + resLength + ' ゼンメツ';
			} else {
				return 'Wave ' + resLength + '時間切れ';
			}
		}
	};
	const norma = () => {
		let tmpNorma = 0;
		let normaFlag = true;
		for (let i = 0; i < stat.waveList.length; i++) {
			if (stat.waveList[i].norma > 0) {
				tmpNorma += stat.waveList[i].norma;
			} else {
				normaFlag = false;
			}
		}
		if (!normaFlag) {
			tmpNorma = '---';
		}
		return tmpNorma;
	};
	const eSpt = () => {
		const resLength = stat.waveList.length;
		if (stat.waveList[resLength - 1].success) {
			if (
				stat.gold >= 0 &&
				stat.red >= 0 &&
				stat.rescue >= 0 &&
				stat.helped >= 0
			) {
				const pt =
					stat.red + stat.gold * 50 + stat.rescue * 100 - stat.helped * 100;
				return pt + ' eSpt';
			} else {
				return 'N/A';
			}
		} else {
			return '---';
		}
	};
	return (
		<div className="Stat">
			<h5 className="Heading">
				<span className="Time">
					{TimeFormat(period)} - {TimeFormat(end)}のシフト
				</span>
				<span className="statId">#{stat.id}</span>
			</h5>
			<div className="Detail">
				<div className="StageInfo">
					<div className="StageResult">
						<div className="StageResultBG" />
						<div className="StageReaultWord">{result()}</div>
					</div>
					<div className="Container">
						<img src={shift.stage.image} alt={shift.stage.name} />
						<span className="StageName">{shift.stage.name}</span>
					</div>
					<StageWeaponList weapons={shift.weapons} />
				</div>
				<div className="StatDetail">
					<div className="StatSum">
						<div className="TeamSum">
							<h3>バイト仲間合計</h3>
							<div className="Data">
								<div className="GoldSum">
									{AvailCheck(stat.sumGold)}/{norma()}
								</div>
								<div className="RedSum">{AvailCheck(stat.sumRed)}</div>
							</div>
						</div>
						<div className="PlayerSum">
							<h3>バイト個人成績</h3>
							<div className="Data">
								<div className="GoldSum">{AvailCheck(stat.gold)}</div>
								<div className="RedSum">{AvailCheck(stat.red)}</div>
								<div className="RescueSum">{AvailCheck(stat.rescue)}</div>
								<div className="HelpedSum">{AvailCheck(stat.helped)}</div>
								<div className="eSpt">{eSpt()}</div>
							</div>
						</div>
						<Waves
							waveList={stat.waveList}
							info={info}
							shift={shift}
							spID={stat.spId}
							weaponList={weaponList}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

Stats.propTypes = {
	stat: PropTypes.object.isRequired,
	shift: PropTypes.object.isRequired,
	period: PropTypes.instanceOf(Date).isRequired,
	info: PropTypes.object.isRequired
};

export default SalmonStat;
