import React, { Component } from 'react';
import logo from './images/SalmonRun_Title.png';
import './App.css';
import stats from './json/SalmonRec.json';
import info from './json/info.json';

import SalmonStatHQ from './components/SalmonStatHQ';
import Gnav from './components/Gnav';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shiftList: [],
			dataset: stats.length - 1,
			stats: stats,
			info: info,
			tab: 'Stat'
		};
	}
	componentWillMount() {
		return fetch('https://spla2.yuu26.com/coop')
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
		if (this.state.dataset + 1 < stats.length - 1) {
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
		if (this.state.dataset + 10 < stats.length - 1) {
			this.setState({
				dataset: this.state.dataset + 10
			});
		} else {
			this.setState({
				dataset: stats.length - 1
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
				/>
			</div>
		);
	}
}

export default App;
