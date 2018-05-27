import React from 'react';
import PropTypes from 'prop-types';

import '../../css/Stat/Waves.css';
import { AvailCheck } from '../../common/common';

const Waves = ({ waveList, info, shift, spID, weaponList }) => {
	const waveAll = waveList.map((wave, id) => {
		return (
			<OneWave
				wave={wave}
				info={info}
				shift={shift}
				spID={spID}
				key={id}
				weaponList={weaponList}
			/>
		);
	});
	return <div className="Waves">{waveAll}</div>;
};

Waves.propTypes = {
	waveList: PropTypes.array.isRequired,
	info: PropTypes.object.isRequired,
	shift: PropTypes.object.isRequired,
	spID: PropTypes.number.isRequired
};

const OneWave = ({ wave, info, shift, spID, weaponList }) => {
	let tideClass;
	switch (wave.tide) {
	case 0:
		tideClass = 'fullTide';
		break;
	case 1:
		tideClass = 'midTide';
		break;
	case 2:
		tideClass = 'lowTide';
		break;
	default:
		tideClass = 'Tide';
	}

	const weaponSrc = shift.weapons.filter(weapon => {
		return weapon.id === wave.weaponId;
	});

	const eventName = info.event.filter(ev => {
		return ev.id === wave.event;
	});

	const resultStatus = () => {
		if (wave.success) {
			return 'Clear!';
		} else {
			if (wave.death) {
				return 'ゼンメツ';
			} else {
				return '時間切れ';
			}
		}
	};

	const special = info.spID.filter(sp => {
		return sp.id === spID;
	});

	const weaponImage = () => {
		if (wave.weaponId !== 9999) {
			return (
				<div className="weapon">
					<img src={weaponSrc[0].image} alt={weaponSrc[0].name} />
				</div>
			);
		} else {
			const weaponTmpList = weaponList.filter(weaponTmp => {
				return weaponTmp.id === wave.randomId;
			});

			if (weaponTmpList[0].id < 10000) {
				return (
					<div className="weapon">
						<img src={weaponTmpList[0].image} alt={weaponTmpList[0].name} />
						<div className="random">?</div>
					</div>
				);
			} else {
				const src = require(`../../${weaponTmpList[0].image}`);
				return (
					<div className="weapon">
						<img src={src} alt={weaponTmpList[0].name} />
						<div className="random">?</div>
					</div>
				);
			}
		}
	};

	return (
		<div className="Wave">
			<div className="Result">
				<div className="Splat1" />
				<div className="ResultWord">{resultStatus()}</div>
			</div>
			<h3>Wave</h3>
			<div className="container">
				<div className={tideClass} />
				<div className="left">{weaponImage()}</div>
				<div className="right">
					<div className="Data">
						<div className="Event">{eventName[0].name}</div>
						<div className="GoldSum">
							{AvailCheck(wave.result)}/
							{AvailCheck(wave.norma)}
						</div>
						<div className="SpCount">
							{special[0].name} 使用回数: {AvailCheck(wave.spCount)}回
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

OneWave.propTypes = {
	wave: PropTypes.object.isRequired,
	info: PropTypes.object.isRequired,
	shift: PropTypes.object.isRequired,
	spID: PropTypes.number.isRequired
};

export default Waves;
