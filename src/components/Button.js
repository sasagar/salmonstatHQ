import React from 'react';
import PropTypes from 'prop-types';
import '../css/Button.css';

const Button = ({ plus, minus, plus10, minus10 }) => {
	return (
		<div className="buttons">
			<div
				className="statMoveBtn"
				onClick={() => {
					minus10();
				}}
			>
				-10
			</div>
			<div
				className="statMoveBtn"
				onClick={() => {
					minus();
				}}
			>
				-1
			</div>
			<div
				className="statMoveBtn"
				onClick={() => {
					plus();
				}}
			>
				+1
			</div>
			<div
				className="statMoveBtn"
				onClick={() => {
					plus10();
				}}
			>
				+10
			</div>
		</div>
	);
};

Button.propTypes = {
	plus: PropTypes.func.isRequired,
	minus: PropTypes.func.isRequired,
	plus10: PropTypes.func.isRequired,
	minus10: PropTypes.func.isRequired
};

export default Button;
