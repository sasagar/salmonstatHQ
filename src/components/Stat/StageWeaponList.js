import React from 'react';
import PropTypes from 'prop-types';
import '../../css/Stat/SalmonWeaponList.css';

const StageWeaponList = ({ weapons }) => {
	const StageWeapon = weapons.map(weapon => {
		return (
			<div className="StageWeapon" key={weapon.id}>
				<div>
					<img
						src={weapon.image}
						alt={weapon.name}
						className="StageWeaponImage"
					/>
				</div>
				<div className="StageWeaponName">{weapon.name}</div>
			</div>
		);
	});

	return (
		<div className="StageWeaponList">
			<h3>支給ブキ</h3>
			{StageWeapon}
		</div>
	);
};

StageWeaponList.propTypes = {
	weapons: PropTypes.array.isRequired
};

export default StageWeaponList;
