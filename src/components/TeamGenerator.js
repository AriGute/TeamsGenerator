import { getStoredPlayersList, setStoredPlayersList } from '../services/generateTeams';
import React, { useState } from 'react';
import ImportPlayerList from './ImportPlayerList';
import TeamCompCard from './common/TeamCompCard';
import TeamsDisplay from './TeamsDisplay';

const TeamGenerator = () => {
	const [playerList, setPlayerList] = useState([]);

	const removeAble = (player) => {
		setPlayerList(playerList.filter((p) => p != player));
	};

	useState(() => {
		const playersList = getStoredPlayersList();
		setPlayerList(playersList);
	}, []);

	function importPlayerList(importPlayers) {
		const playersSet = new Set([...playerList, ...importPlayers]);
		const players = [...playersSet];
		setStoredPlayersList(players);
		setPlayerList(players);
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
