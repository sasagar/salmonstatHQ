import React from 'react';
import PropTypes from 'prop-types';
import '../../css/FileReader/FileReader.css';

const FileReader = ({ onFormSubmit, onChange }) => {
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

FileReader.propTypes = {
	onFormSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};

export default FileReader;
