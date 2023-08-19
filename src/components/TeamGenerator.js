import React, { useState, useEffect } from 'react';
import ImportPlayerList from './ImportPlayerList';
import TeamCompCard from './common/TeamCompCard';
import TeamsDisplay from './TeamsDisplay';
import { eventsNames } from '../utils/consts';
import TeamsHandler from '../services/TeamsHandler';

const TeamGenerator = () => {
	const [playerList, setPlayerList] = useState([]);

	const removePlayer = (player) => {
		TeamsHandler.removePlayers(player);
		setPlayerList(TeamsHandler.getAllPlayers());
	};

	function importPlayerList(importPlayers) {
		TeamsHandler.addPlayers(importPlayers);
		setPlayerList(TeamsHandler.getAllPlayers());
	}

	function addPlayerToPreTeam(e) {
		const { player, team } = e.detail;
		TeamsHandler.addPlayerToPreTeam(player, team);
		setPlayerList(TeamsHandler.getAllPlayers());
		window.dispatchEvent(new Event(eventsNames.updateTeams));
	}

	useEffect(() => {
		const clearListener = window.addEventListener(eventsNames.clear, () => setPlayerList([]));
		const addPreTeamListener = window.addEventListener(
			eventsNames.addPlayerToPreTeam,
			addPlayerToPreTeam,
		);

		return () => {
			window.removeEventListener(clearListener);
			window.removeEventListener(addPreTeamListener);
		};
	}, []);

	return (
		<div className='flex flex-col items-center'>
			<ImportPlayerList callback={importPlayerList}></ImportPlayerList>
			<TeamCompCard list={playerList} name={'Players'} removeFunc={removePlayer}></TeamCompCard>
			<TeamsDisplay playerList={playerList}></TeamsDisplay>
		</div>
	);
};

export default TeamGenerator;
