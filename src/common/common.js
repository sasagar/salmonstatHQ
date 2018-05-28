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

export const eSpt = stat => {
	const resLength = stat.waveList.length;
	if (stat.waveList[resLength - 1].success) {
		if (
			stat.gold >= 0 &&
			stat.red >= 0 &&
			stat.rescue >= 0 &&
			stat.helped >= 0
		) {
			const pt =
				stat.red + stat.gold * 50 + stat.rescue * 100 - stat.helped * 100;
			return pt + ' eSpt';
		} else {
			return 'N/A';
		}
	} else {
		return '---';
	}
};

export const norma = stat => {
	let tmpNorma = 0;
	let normaFlag = true;
	for (let i = 0; i < stat.waveList.length; i++) {
		if (stat.waveList[i].norma > 0) {
			tmpNorma += stat.waveList[i].norma;
		} else {
			normaFlag = false;
		}
	}
	if (!normaFlag) {
		tmpNorma = '---';
	}
	return tmpNorma;
};

export const result = stat => {
	const resLength = stat.waveList.length;
	if (stat.waveList[resLength - 1].success) {
		return 'Clear!';
	} else {
		if (stat.waveList[resLength - 1].death) {
			return 'Wave ' + resLength + ' ゼンメツ';
		} else {
			return 'Wave ' + resLength + ' 時間切れ';
		}
	}
};

export const resultGetter = stat => {
	const resLength = stat.waveList.length;
	if (stat.waveList[resLength - 1].success) {
		return { resultId: 0, result: 'Clear', wave: 3 };
	} else {
		if (stat.waveList[resLength - 1].death) {
			return { resultId: 1, result: 'Death', wave: resLength };
		} else {
			return { resultId: 2, result: 'Timeout', wave: resLength };
		}
	}
};
