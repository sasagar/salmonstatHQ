import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../css/Report/ReportForm.css';

import ShiftSelector from './ShiftSelector';
import Wave from './Wave';

class ReportForm extends Component {
	constructor(props) {
		super(props);

		const shifts = this.shiftList.filter(shift => {
			return shift.stage !== null;
		});
		const shift = shifts.length - 2;
		const period = shifts[shifts.length - 2].start;

		this.state = {
			shift: shift,
			stat: {
				id: 0,
				red: 0,
				helped: 0,
				period: period,
				sumRed: 0,
				rescue: 0,
				sumGold: 0,
				tag: 0,
				time: '',
				waveList: [
					{
						result: 0,
						norma: 0,
						spCount: 0,
						randomId: -1,
						death: false,
						weaponTag: -1,
						success: false,
						tide: 1,
						event: 0,
						weaponId: 0,
						type: 0
					},
					{
						result: 0,
						norma: 0,
						spCount: 0,
						randomId: -1,
						death: false,
						weaponTag: -1,
						success: false,
						tide: 1,
						event: 0,
						weaponId: 0,
						type: 0
					},
					{
						result: 0,
						norma: 0,
						spCount: 0,
						randomId: -1,
						death: false,
						weaponTag: -1,
						success: false,
						tide: 1,
						event: 0,
						weaponId: 0,
						type: 0
					}
				],
				gold: 0,
				spId: 0,
				stageId: 0
			}
		};

		this.changeHandler = this.changeHandler.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}

	shiftList = this.props.shiftList;
	dataset = this.props.dataset;
	stats = this.props.stats;
	info = this.props.info;
	weaponList = this.props.weaponList;

	changeHandler(e, wave = -1) {
		let stat = this.state.stat;
		const value = e.target.value;
		const tmpArr = this.state.stat.waveList.slice();

		const target = e.target.name.slice(0, -1);

		if (wave >= 0) {
			switch (target) {
			case 'tide':
				tmpArr[wave].tide = parseInt(value);
				this.setState(
					(stat: {
							waveList: tmpArr
						})
				);
				break;

			case 'event':
				tmpArr[wave].event = parseInt(value);
				this.setState(
					(stat: {
							waveList: tmpArr
						})
				);
				break;

			case 'spCount':
				tmpArr[wave].spCount = parseInt(value);
				this.setState(
					(stat: {
							waveList: tmpArr
						})
				);
				break;

			case 'norma':
				tmpArr[wave].norma = parseInt(value);
				this.setState(
					(stat: {
							waveList: tmpArr
						})
				);
				break;

			case 'gold': {
				tmpArr[wave].result = parseInt(value);
				this.setState(
					(stat: {
							waveList: tmpArr
						})
				);
				const tmpArrWaves = tmpArr.filter(tmp => {
					return tmp.success === true;
				});
				const length = tmpArrWaves.length + 1;
				let i = 0;
				let sumGold = 0;
				while (i < length) {
					sumGold += tmpArr[i].result;
					i++;
				}
				if (isNaN(sumGold)) {
					sumGold = 0;
				}
				let tmpStat = this.state.stat;
				tmpStat.sumGold = sumGold;
				this.setState({
					stat: tmpStat
				});
				break;
			}

			case 'weapon':
				tmpArr[wave].weaponId = parseInt(value);
				if (tmpArr[wave].weaponId !== 9999) {
					tmpArr[wave].randomId = -1;
				}
				this.setState(
					(stat: {
							waveList: tmpArr
						})
				);
				break;

			case 'randomId':
				tmpArr[wave].randomId = parseInt(value);
				this.setState(
					(stat: {
							waveList: tmpArr
						})
				);
				break;

			case 'type':
				tmpArr[wave].type = parseInt(value);
				this.setState(
					(stat: {
							waveList: tmpArr
						})
				);
				break;

			case 'result':
				switch (value) {
				case 'success':
					tmpArr[wave].success = true;
					tmpArr[wave].death = false;
					break;

				case 'death':
					tmpArr[wave].success = false;
					tmpArr[wave].death = true;
					break;

				case 'timeout':
					tmpArr[wave].success = false;
					tmpArr[wave].death = false;
					break;
				}

				this.setState(
					(stat: {
							waveList: tmpArr
						})
				);
			}
		} else {
			switch (target) {
			case 'reportResultGold':
				this.setState({
					stat: {
						sumGold: parseInt(value)
					}
				});
				break;

			case 'reportResultRed':
				this.setState({
					stat: {
						sumRed: parseInt(value)
					}
				});
				break;

			case 'reportResultPresonalGold':
				this.setState({
					stat: {
						gold: parseInt(value)
					}
				});
				break;

			case 'reportResultPresonalRed':
				this.setState({
					stat: {
						red: parseInt(value)
					}
				});
				break;

			case 'reportResultPresonalRescue':
				this.setState({
					stat: {
						rescue: parseInt(value)
					}
				});
				break;

			case 'reportResultPresonalDeath':
				this.setState({
					stat: {
						helped: parseInt(value)
					}
				});
				break;

			case 'reportShift':
				this.setState({
					shift: parseInt(value)
				});
				break;
			}
		}
	}

	clickHandler = e => {
		let rptSubmit;

		switch (e.target.id) {
		case 'reportSubmit':
			rptSubmit = window.ipcRenderer.sendSync('addStat', this.state.stat);
			console.dir(rptSubmit);
			alert('登録出来ました！');
			break;

		default:
			break;
		}
	};

	render() {
		return (
			<div className="ReportForm">
				<div className="Heading">
					<span className="Title">バイト業績報告書</span>
				</div>
				<ShiftSelector
					shiftList={this.shiftList}
					handler={this.changeHandler}
				/>
				<WaveReport
					shiftList={this.shiftList}
					shift={this.state.shift}
					handler={this.changeHandler}
					waveList={this.state.stat.waveList}
					weaponList={this.weaponList}
				/>
				<Result
					shiftList={this.shiftList}
					shift={this.state.shift}
					handler={this.changeHandler}
					stat={this.state.stat}
					clickHandler={this.clickHandler}
				/>
			</div>
		);
	}
}

const WaveReport = ({ shiftList, shift, handler, waveList, weaponList }) => {
	const tmpCount = waveList.filter(oneWave => {
		return oneWave.success === true;
	});

	let waveCount;
	if (tmpCount.length === 3) {
		waveCount = 3;
	} else {
		waveCount = tmpCount.length + 1;
	}

	let wave = 1;
	let waveComponent = [];
	while (wave <= waveCount) {
		waveComponent[wave - 1] = (
			<Wave
				wave={wave}
				shiftList={shiftList}
				shift={shift}
				handler={handler}
				waveData={waveList[wave - 1]}
				key={wave}
				waveList={waveList}
				weaponList={weaponList}
			/>
		);
		wave++;
	}
	return <div>{waveComponent}</div>;
};

const Result = ({ shiftList, shift, handler, stat, clickHandler }) => {
	return (
		<div className="Result">
			<div className="Stage">
				<div className="reportResultInput">
					<label htmlFor="reportResultGold">総金イクラ</label>
					<input
						type="number"
						name="reportResultGold"
						id="reportResultGold"
						value={stat.sumGold}
						onChange={handler}
					/>
				</div>
				<div className="reportResultInput">
					<label htmlFor="reportResultRed">総赤イクラ</label>
					<input
						type="number"
						name="reportResultRed"
						id="reportResultRed"
						value={stat.sumRed}
						onChange={handler}
					/>
				</div>
			</div>
			<div className="Personal">
				<div className="reportLeft">
					<div className="reportResultInput">
						<label htmlFor="reportResultPersonalGold">個人金イクラ</label>
						<input
							type="number"
							name="reportResultPersonalGold"
							id="reportResultPersonalGold"
							value={stat.gold}
							onChange={handler}
						/>
					</div>
					<div className="reportResultInput">
						<label htmlFor="reportResultPersonalRed">個人赤イクラ</label>
						<input
							type="number"
							name="reportResultPersonalRed"
							id="reportResultPersonalRed"
							value={stat.red}
							onChange={handler}
						/>
					</div>
				</div>
				<div className="reportRight">
					<div className="reportResultInput">
						<label htmlFor="reportResultPersonalRescue">救出数</label>
						<input
							type="number"
							name="reportResultPersonalRescue"
							id="reportResultPersonalRescue"
							value={stat.rescue}
							onChange={handler}
						/>
					</div>
					<div className="reportResultInput">
						<label htmlFor="reportResultPersonalDeath">死亡数</label>
						<input
							type="number"
							name="reportResultPersonalDeath"
							id="reportResultPersonalDeath"
							value={stat.helped}
							onChange={handler}
						/>
					</div>
				</div>
			</div>
			<button
				type="button"
				className="reportSubmit"
				id="reportSubmit"
				onClick={clickHandler}
			>
				報告！
			</button>
		</div>
	);
};

export default ReportForm;
