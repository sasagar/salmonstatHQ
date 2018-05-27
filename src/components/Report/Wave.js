import React from 'react';
import PropTypes from 'prop-types';
import '../../css/Report/Wave.css';

const Wave = ({
	shiftList,
	shift,
	wave,
	handler,
	waveData,
	waveList,
	weaponList
}) => {
	return (
		<div className="WaveReport">
			<h3>Wave {wave}</h3>
			<WeaponSelector
				shiftData={shiftList[shift]}
				handler={handler}
				wave={wave - 1}
				waveList={waveList}
				weaponList={weaponList}
			/>
			<div className="WaveReportDetail">
				<Tide handler={handler} wave={wave - 1} />
				<Event handler={handler} wave={wave - 1} waveData={waveData} />
				<PlayStats handler={handler} wave={wave - 1} waveList={waveList} />
			</div>
			<WaveResultSelector
				handler={handler}
				wave={wave - 1}
				waveData={waveData}
			/>
		</div>
	);
};

const WeaponSelector = ({ shiftData, handler, wave, waveList, weaponList }) => {
	const weaponListComponent = shiftData.weapons.map((weapon, index) => {
		const id = 'w' + wave + '-' + weapon.id;
		const name = 'weapon' + wave;
		return (
			<div className="weapon" key={index}>
				<input
					name={name}
					type="radio"
					value={weapon.id}
					id={id}
					onChange={e => handler(e, wave)}
				/>
				<label htmlFor={id}>
					<img src={weapon.image} alt={weapon.name} />
					<span>{weapon.name}</span>
				</label>
			</div>
		);
	});
	const randomSelector = () => {
		const randomType = () => {
			return (
				<div className="randomType">
					<input
						type="radio"
						value="0"
						id={'shooter' + wave}
						name={'type' + wave}
						onChange={e => handler(e, wave)}
					/>
					<label htmlFor={'shooter' + wave}>シューター</label>
					<input
						type="radio"
						value="1"
						id={'manuber' + wave}
						name={'type' + wave}
						onChange={e => handler(e, wave)}
					/>
					<label htmlFor={'manuber' + wave}>マニューバー</label>
					<input
						type="radio"
						value="2"
						id={'blaster' + wave}
						name={'type' + wave}
						onChange={e => handler(e, wave)}
					/>
					<label htmlFor={'blaster' + wave}>ブラスター</label>
					<input
						type="radio"
						value="3"
						id={'roller' + wave}
						name={'type' + wave}
						onChange={e => handler(e, wave)}
					/>
					<label htmlFor={'roller' + wave}>ローラー</label>
					<input
						type="radio"
						value="4"
						id={'charger' + wave}
						name={'type' + wave}
						onChange={e => handler(e, wave)}
					/>
					<label htmlFor={'charger' + wave}>チャージャー</label>
					<input
						type="radio"
						value="5"
						id={'slosher' + wave}
						name={'type' + wave}
						onChange={e => handler(e, wave)}
					/>
					<label htmlFor={'slosher' + wave}>スロッシャー</label>
					<input
						type="radio"
						value="6"
						id={'spinner' + wave}
						name={'type' + wave}
						onChange={e => handler(e, wave)}
					/>
					<label htmlFor={'spinner' + wave}>スピナー</label>
					<input
						type="radio"
						value="7"
						id={'shelter' + wave}
						name={'type' + wave}
						onChange={e => handler(e, wave)}
					/>
					<label htmlFor={'shelter' + wave}>シェルター</label>
					<input
						type="radio"
						value="8"
						id={'coop' + wave}
						name={'type' + wave}
						onChange={e => handler(e, wave)}
					/>
					<label htmlFor={'coop' + wave}>クマサン印</label>
				</div>
			);
		};
		let weapons, random;
		switch (waveList[wave].type) {
		case 0:
			// Shooter
			weapons = weaponList.filter(weapon => {
				return (
					(0 <= weapon.id && weapon.id < 200) ||
						(300 <= weapon.id && weapon.id < 500)
				);
			});
			break;
		case 1:
			// Manuber
			weapons = weaponList.filter(weapon => {
				return 5000 <= weapon.id && weapon.id < 6000;
			});
			break;
		case 2:
			// Blaster
			weapons = weaponList.filter(weapon => {
				return 200 <= weapon.id && weapon.id < 300;
			});
			break;
		case 3:
			// Roller
			weapons = weaponList.filter(weapon => {
				return 1000 <= weapon.id && weapon.id < 2000;
			});
			break;
		case 4:
			// Charger
			weapons = weaponList.filter(weapon => {
				return 2000 <= weapon.id && weapon.id < 3000;
			});
			break;
		case 5:
			// Slosher
			weapons = weaponList.filter(weapon => {
				return 3000 <= weapon.id && weapon.id < 4000;
			});
			break;
		case 6:
			// Spinner
			weapons = weaponList.filter(weapon => {
				return 4000 <= weapon.id && weapon.id < 5000;
			});
			break;
		case 7:
			// Shelter
			weapons = weaponList.filter(weapon => {
				return 6000 <= weapon.id && weapon.id < 7000;
			});
			break;
		case 8:
			// Coop
			weapons = weaponList.filter(weapon => {
				return 10000 <= weapon.id && weapon.id < 10003;
			});
			break;
		}
		if (waveList[wave].weaponId === 9999) {
			random = weapons.map(weapon => {
				if (weapon.id < 9999) {
					return (
						<div key={weapon.id}>
							<input
								type="radio"
								name="randomId"
								onChange={e => handler(e, wave)}
								value="weapon.id"
								id={'random' + weapon.id + wave}
							/>
							<label htmlFor={'random' + weapon.id + wave}>
								<img src={weapon.image} alt={weapon.name} />
								{weapon.name}
							</label>
						</div>
					);
				} else if (weapon.id > 9999) {
					const src = require(`../../${weapon.image}`);
					return (
						<div key={weapon.id}>
							<input
								type="radio"
								name="randomId"
								onChange={e => handler(e, wave)}
								value="weapon.id"
								id={'random' + weapon.id + wave}
							/>
							<label htmlFor={'random' + weapon.id + wave}>
								<img src={src} alt={weapon.name} />
								{weapon.name}
							</label>
						</div>
					);
				}
			});
			return (
				<div className="RandomSelector">
					<h3>ランダムブキ選択</h3>
					{randomType()}
					<div className="randomWeapons">{random}</div>
				</div>
			);
		} else {
			return <div className="RandomSelector" />;
		}
	};
	return (
		<div className="WeaponSelector">
			<div className="weaponList">{weaponListComponent}</div>
			{randomSelector()}
		</div>
	);
};

const Tide = ({ handler, wave }) => {
	const name = 'tide' + wave;
	return (
		<div className="Tide">
			<h3>潮</h3>
			<div>
				<input
					name={name}
					type="radio"
					value="0"
					id={'fullTide' + wave}
					onChange={e => handler(e, wave)}
				/>
				<label htmlFor={'fullTide' + wave}>満潮</label>
				<input
					name={name}
					type="radio"
					value="1"
					id={'midTide' + wave}
					onChange={e => handler(e, wave)}
				/>
				<label htmlFor={'midTide' + wave}>通常</label>
				<input
					name={name}
					type="radio"
					value="2"
					id={'lowTide' + wave}
					onChange={e => handler(e, wave)}
				/>
				<label htmlFor={'lowTide' + wave}>干潮</label>
			</div>
		</div>
	);
};

const Event = ({ handler, wave, waveData }) => {
	const name = 'event' + wave;
	let dis = [];
	switch (waveData.tide) {
	case 0:
		dis = ['', '', '', '', '', '', 'disabled'];
		break;
	case 1:
		dis = ['', '', '', '', '', '', 'disabled'];
		break;
	case 2:
		dis = ['', '', '', 'disabled', 'disabled', 'disabled', ''];
		break;
	}
	return (
		<div className="Event">
			<h3>Waveの種別</h3>
			<div>
				<input
					name={name}
					type="radio"
					value="0"
					id={'eventNomal' + wave}
					onChange={e => handler(e, wave)}
					disabled={dis[0]}
				/>
				<label htmlFor={'eventNomal' + wave}>通常</label>
				<input
					name={name}
					type="radio"
					value="1"
					id={'eventHakobiya' + wave}
					onChange={e => handler(e, wave)}
					disabled={dis[1]}
				/>
				<label htmlFor={'eventHakobiya' + wave}>ハコビヤ襲来</label>
				<input
					name={name}
					type="radio"
					value="2"
					id={'eventFog' + wave}
					onChange={e => handler(e, wave)}
					disabled={dis[2]}
				/>
				<label htmlFor={'eventFog' + wave}>霧</label>
				<input
					name={name}
					type="radio"
					value="3"
					id={'eventHikaribae' + wave}
					onChange={e => handler(e, wave)}
					disabled={dis[3]}
				/>
				<label htmlFor={'eventHikaribae' + wave}>ヒカリバエ</label>
				<input
					name={name}
					type="radio"
					value="4"
					id={'eventGrill' + wave}
					onChange={e => handler(e, wave)}
					disabled={dis[4]}
				/>
				<label htmlFor={'eventGrill' + wave}>グリル発進</label>
				<input
					name={name}
					type="radio"
					value="5"
					id={'eventKanketsusen' + wave}
					onChange={e => handler(e, wave)}
					disabled={dis[5]}
				/>
				<label htmlFor={'eventKanketsusen' + wave}>カンケツセン</label>
				<input
					name={name}
					type="radio"
					value="6"
					id={'eventDoskoi' + wave}
					onChange={e => handler(e, wave)}
					disabled={dis[6]}
				/>
				<label htmlFor={'eventDoskoi' + wave}>ドスコイの大群</label>
			</div>
		</div>
	);
};

const PlayStats = ({ handler, wave, waveList }) => {
	return (
		<div className="PlayStats">
			<Norma handler={handler} wave={wave} />
			<GoldCount handler={handler} wave={wave} />
			<Special handler={handler} wave={wave} waveList={waveList} />
		</div>
	);
};

const Special = ({ handler, wave, waveList }) => {
	const name = 'spCount' + wave;
	let dis = [];
	switch (wave) {
	case 1:
		switch (waveList[0].spCount) {
		case 0:
			dis = ['', '', ''];
			break;
		case 1:
			dis = ['', '', 'disabled'];
			break;
		case 2:
			dis = ['', 'disabled', 'disabled'];
			break;
		}
		break;
	case 2:
		switch (waveList[0].spCount + waveList[1].spCount) {
		case 0:
			dis = ['', '', ''];
			break;
		case 1:
			dis = ['', '', 'disabled'];
			break;
		case 2:
			dis = ['', 'disabled', 'disabled'];
			break;
		}
		break;
	default:
		dis = ['', '', ''];
		break;
	}
	return (
		<div className="Special">
			<h3>スペシャルパック利用回数</h3>
			<div>
				<input
					name={name}
					type="radio"
					value="0"
					id={'sp0' + wave}
					onChange={e => handler(e, wave)}
					disabled={dis[0]}
				/>
				<label htmlFor={'sp0' + wave}>0</label>
				<input
					name={name}
					type="radio"
					value="1"
					id={'sp1' + wave}
					onChange={e => handler(e, wave)}
					disabled={dis[1]}
				/>
				<label htmlFor={'sp1' + wave}>1</label>
				<input
					name={name}
					type="radio"
					value="2"
					id={'sp2' + wave}
					onChange={e => handler(e, wave)}
					disabled={dis[2]}
				/>
				<label htmlFor={'sp2' + wave}>2</label>
			</div>
		</div>
	);
};

const Norma = ({ handler, wave }) => {
	const name = 'norma' + wave;
	return (
		<div className="Norma">
			<h3>ノルマ</h3>
			<input
				type="number"
				name={name}
				onChange={e => handler(e, wave)}
				defaultValue="0"
			/>
		</div>
	);
};

const GoldCount = ({ handler, wave }) => {
	const name = 'gold' + wave;
	return (
		<div className="GoldCount">
			<h3>獲得金イクラ</h3>
			<input
				type="number"
				name={name}
				onChange={e => handler(e, wave)}
				defaultValue="0"
			/>
		</div>
	);
};

const WaveResultSelector = ({ handler, wave, waveData }) => {
	const name = 'result' + wave;
	let dis = [];
	if (waveData.norma <= waveData.result) {
		dis = ['', '', 'disabled'];
	} else {
		dis = ['disabled', '', ''];
	}
	return (
		<div className="WaveResult">
			<input
				name={name}
				type="radio"
				value="success"
				id={'res0' + wave}
				onChange={e => handler(e, wave)}
				disabled={dis[0]}
			/>
			<label htmlFor={'res0' + wave}>Clear!</label>
			<input
				name={name}
				type="radio"
				value="death"
				id={'res1' + wave}
				onChange={e => handler(e, wave)}
				disabled={dis[1]}
			/>
			<label htmlFor={'res1' + wave}>ゼンメツ</label>
			<input
				name={name}
				type="radio"
				value="timeout"
				id={'res2' + wave}
				onChange={e => handler(e, wave)}
				disabled={dis[2]}
			/>
			<label htmlFor={'res2' + wave}>時間切れ</label>
		</div>
	);
};

export default Wave;
