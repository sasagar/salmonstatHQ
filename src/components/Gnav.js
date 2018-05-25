import React from 'react';
import PropTypes from 'prop-types';
import '../css/Gnav.css';

const Gnav = ({ tab }) => {
	return (
		<nav className="Gnav">
			<ul>
				<li>Stat</li>
				<li>シフト報告</li>
				<li>報告書リスト</li>
			</ul>
		</nav>
	);
};

export default Gnav;
