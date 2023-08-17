import React, { useState } from 'react';
import Button from './common/Button';

const ImportPlayerList = ({ callback }) => {
	const [playerList, setPlayerList] = useState('');

	function addPlayerButton() {
		const list = playerList
			.split('\n')
			.filter((p) => p != '')
			.map((p) => p.trim());
		callback(list);
	}

	return (
		<div className=' text-center'>
			<h1 className=' underline'>Import List</h1>
			<div className='flex flex-col items-center'>
				<textarea
					className=' bg-gray-100 w-[300px] rounded'
					name=''
					id='playersToImport'
					cols='30'
					rows='5'
					onChange={(e) => setPlayerList(e.target.value)}></textarea>
				<Button text={'Add Players'} color={'gray'} callback={addPlayerButton}></Button>
			</div>
		</div>
	);
};

export default ImportPlayerList;
