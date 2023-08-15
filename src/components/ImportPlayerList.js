import React, { useState } from 'react';

const ImportPlayerList = ({ props }) => {
	const [playerList, setPlayerList] = useState('');
	const { callback } = props || {
		callback: function () {
			console.log('no callback function was given');
			return [];
		},
	};

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
				<button
					className=' bg-gray-300 h-10 p-2 m-2 rounded w-[150px] hover:bg-gray-400'
					onClick={() => {
						const list = playerList
							.split('\n')
							.filter((p) => p != '')
							.map((p) => p.trim());
						callback(list);
					}}>
					Add Players
				</button>
			</div>
		</div>
	);
};

export default ImportPlayerList;
