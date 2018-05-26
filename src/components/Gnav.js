import React from 'react';
import PropTypes from 'prop-types';
import '../css/Gnav.css';

const Gnav = ({ tab, onTabChange }) => {
	let classes = {
		Stat: '',
		Report: '',
		List: ''
	};
	switch (tab) {
	case 'Report':
		classes.Report = 'Active';
		break;

	case 'List':
		classes.List = 'Active';
		break;

	default:
		classes.Stat = 'Active';
		break;
	}
	return (
		<nav className="Gnav">
			<ul>
				<li
					className={classes.Stat}
					onClick={() => {
						onTabChange('Stat');
					}}
				>
					Stat
				</li>
				<li
					className={classes.Report}
					onClick={() => {
						onTabChange('Report');
					}}
				>
					シフト報告
				</li>
				<li
					className={classes.List}
					onClick={() => {
						onTabChange('List');
					}}
				>
					報告書リスト
				</li>
			</ul>
		</nav>
	);
};

Gnav.propTypes = {
	tab: PropTypes.string.isRequired,
	onTabChange: PropTypes.func.isRequired
};

export default Gnav;
