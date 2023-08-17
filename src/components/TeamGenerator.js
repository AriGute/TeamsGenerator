import React, { useState, useEffect } from 'react';
import ImportPlayerList from './ImportPlayerList';
import TeamCompCard from './common/TeamCompCard';
import TeamsDisplay from './TeamsDisplay';

const TeamGenerator = () => {
	const [playerList, setPlayerList] = useState([]);

	const removeAble = (player) => {
		setPlayerList(playerList.filter((p) => p != player));
	};

	function importPlayerList(importPlayers) {
		const set = new Set([...playerList, ...importPlayers]);
		setPlayerList([...set]);
	}

	window.addEventListener('clear', () => setPlayerList([]));

	return (
		<div className='flex flex-col items-center'>
			<ImportPlayerList callback={importPlayerList}></ImportPlayerList>
			<TeamCompCard list={playerList} name={'Players'} removeFunc={removeAble}></TeamCompCard>
			<TeamsDisplay playerList={playerList}></TeamsDisplay>
		</div>
	);
};

export default TeamGenerator;
