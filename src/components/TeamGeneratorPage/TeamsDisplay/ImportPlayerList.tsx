import React, { useState, useEffect, useContext } from 'react';
import { DisplayContext } from '../services/Context';

interface ImportPlayerListProps {
	onImportPlayerList: Function;
}

const ImportPlayerList = ({ onImportPlayerList }: ImportPlayerListProps) => {
	const [playerList, setPlayerList] = useState<string>('');
	const displayContext = useContext(DisplayContext);

	const addPlayerButton = (): void => {
		let list = playerList
			.split('\n')
			.filter((p) => p != '' && /[a-zA-Z]/.test(p))
			.map((p) => p.trim());
		onImportPlayerList(list);
	};
	const onClear = (): void => {
		setPlayerList('');
	};

	useEffect(() => {
		displayContext.toClear.push(onClear);
	}, []);

	return (
		<div className=' text-center mb-5 bg-gray-500 '>
			<h1 className=' mx-2 text-white select-none'>Import List</h1>
			<div className='flex flex-col items-center'>
				<textarea
					className=' w-[400px] min-h-[150px]  bg-slate-100 rounded p-2 m-1 overflow-y-auto TeamCompCardScroll'
					name=''
					id='playersToImport'
					cols={30}
					rows={5}
					value={playerList.toString().replaceAll(',', '\n')}
					onChange={(e) => setPlayerList(e.target.value)}
				/>
				<button
					className={` transition ease-in-out bg-gray-300 h-10 p-2 m-2 rounded w-[150px] hover:bg-gray-400`}
					onClick={addPlayerButton}>
					Add Players
				</button>
			</div>
		</div>
	);
};

export default ImportPlayerList;
