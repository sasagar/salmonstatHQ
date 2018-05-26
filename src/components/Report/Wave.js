import React from 'react';
import PropTypes from 'prop-types';
import '../../css/Report/Wave.css';

const Wave = ({ shiftList, shift, wave, handler, waveData, waveList }) => {
	return (
		<div className="WaveReport">
			<h3>Wave {wave}</h3>
			<WeaponSelector
				shiftData={shiftList[shift]}
				handler={handler}
				wave={wave - 1}
				waveData={waveData}
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

const WeaponSelector = ({ shiftData, handler, wave }) => {
	const weaponList = shiftData.weapons.map((weapon, index) => {
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
	return <div className="WeaponSelector">{weaponList}</div>;
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
