export const AvailCheck = val => {
	if (val === -1) {
		return '---';
	} else {
		return val;
	}
};

export const TimeFormat = date => {
	return (
		date.getFullYear() +
		'/' +
		String(date.getMonth() + 1).padStart(2, '0') +
		'/' +
		String(date.getDate()).padStart(2, '0') +
		' ' +
		String(date.getHours()).padStart(2, '0') +
		':' +
		String(date.getMinutes()).padStart(2, '0')
	);
};
