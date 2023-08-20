import React, { useState, useEffect, useContext } from 'react';
import { DisplayContext } from './services/Context';

const ImportPlayerList = ({ onImportPlayerList }) => {
	const [playerList, setPlayerList] = useState('');
	const displayContext = useContext(DisplayContext);

	const addPlayerButton = () => {
		let list = playerList
			.split('\n')
			.filter((p) => p != '' && /[a-zA-Z]/.test(p))
			.map((p) => p.trim());
		onImportPlayerList(list);
	};
	const onClear = () => {
		setPlayerList('');
	};

	useEffect(() => {
		displayContext.toClear.push(onClear);
	}, []);

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
					value={playerList.toString().replaceAll(',', '\n')}
					onChange={(e) => setPlayerList(e.target.value)}></textarea>
				<button
					className={`bg-gray-300 h-10 p-2 m-2 rounded w-[150px] hover:bg-gray-400`}
					onClick={addPlayerButton}>
					Add Players
				</button>
			</div>
		</div>
	);
};

export default ImportPlayerList;
