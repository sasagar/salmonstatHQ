import React, { Component } from 'react';

import logo from './images/SalmonRun_Title.png';
import './App.css';
import info from './json/info.json';

import SalmonStatHQ from './components/SalmonStatHQ';
import Gnav from './components/Gnav';

class App extends Component {
	constructor(props) {
		super(props);
		let stats;
		try {
			stats = require(`${process.env.REACT_APPDIR}/SalmonRec.json`);
		} catch (e) {
			stats = [];
		}

		this.state = {
			shiftList: [],
			dataset: stats.length - 2,
			stats: stats,
			info: info,
			tab: 'Stat',
			file: ''
		};
	}
	componentWillMount() {
		fetch('https://spla2.yuu26.com/coop')
			.then(response => response.json())
			.then(responseJson => {
				this.setState({ shiftList: responseJson.result });
			})
			.catch(error => {
				throw new Error(error);
			});
	}

	componentDidMount() {
		document.title = 'SalmonStat HQ';
	}

	onButtonPlus = () => {
		if (this.state.dataset + 1 < this.state.stats.length - 1) {
			this.setState({
				dataset: this.state.dataset + 1
			});
		}
	};
	onButtonMinus = () => {
		if (this.state.dataset - 1 >= 0) {
			this.setState({
				dataset: this.state.dataset - 1
			});
		}
	};
	onButtonPlus10 = () => {
		if (this.state.dataset + 10 < this.state.stats.length - 1) {
			this.setState({
				dataset: this.state.dataset + 10
			});
		} else {
			this.setState({
				dataset: this.state.stats.length - 1
			});
		}
	};
	onButtonMinus10 = () => {
		if (this.state.dataset - 10 >= 0) {
			this.setState({
				dataset: this.state.dataset - 10
			});
		} else {
			this.setState({
				dataset: 0
			});
		}
	};

	onTabChange = tabName => {
		this.setState({
			tab: tabName
		});
	};

	onFormSubmit = e => {
		e.preventDefault(); // Stop form submit
		const tmpStats = JSON.parse(this.state.file.data);
		this.setState({
			stats: tmpStats,
			dataset: tmpStats.length - 2
		});
		const res = window.ipcRenderer.sendSync('setStat', tmpStats);
		console.log(res);
	};

	onChange = e => {
		const reader = new FileReader();

		reader.readAsText(e.target.files[0]);

		let data;
		const onLoad = e => {
			data = e.target.result;
			this.setState({ file: { target: e.target.files, data: data } });
		};
		reader.onload = onLoad;
	};

	tabSet = dataset => {
		this.setState({
			dataset: dataset
		});
		this.onTabChange('Stat');
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h3>
						<span>SalmonStat HQ</span>
					</h3>
				</header>
				<Gnav tab={this.state.tab} onTabChange={this.onTabChange} />
				<SalmonStatHQ
					className="SalmonStatHQ"
					shiftList={this.state.shiftList}
					dataset={this.state.dataset}
					stats={this.state.stats}
					info={this.state.info}
					onButtonPlus={this.onButtonPlus}
					onButtonMinus={this.onButtonMinus}
					onButtonPlus10={this.onButtonPlus10}
					onButtonMinus10={this.onButtonMinus10}
					tab={this.state.tab}
					tabSet={this.tabSet}
					onFormSubmit={this.onFormSubmit}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}

export default App;
