import React from 'react';
import PropTypes from 'prop-types';
import '../../css/FileReader/FileReader.css';

import {
	AvailCheck,
	TimeFormat,
	eSpt,
	norma,
	result,
	resultGetter
} from '../../common/common';

const props = this.props;

const FileReader = ({ stats, onFormSubmit, onChange }) => {
	return (
		<div className="container">
			<form
				id="jsonReader"
				onSubmit={e => onFormSubmit(e)}
				encType="multipart/form-data"
			>
				<input type="file" accept=".json" onChange={e => onChange(e)} />
				<button type="submit">送信</button>
			</form>
		</div>
	);
};

export default FileReader;
