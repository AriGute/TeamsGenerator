import React, { useState, useEffect, useContext } from 'react';
import ImportPlayerList from './ImportPlayerList';
import TeamCompCard from './common/TeamCompCard';
import TeamsDisplay from './TeamsDisplay';
import { eventsNames } from '../../utils/consts';
import TeamsHandler from './services/TeamsHandler';
import { DisplayContext } from './services/Context';

const TeamGenerator = () => {
	const [playerList, setPlayerList] = useState([]);
	const displayContext = useContext(DisplayContext);

	const removePlayer = (player) => {
		TeamsHandler.removePlayers(player);
		setPlayerList(TeamsHandler.getPublicGroup());
	};

	function importPlayerList(importPlayers) {
		TeamsHandler.addPlayers(importPlayers);
		setPlayerList(TeamsHandler.getPublicGroup());
	}

	function loadPlayersFromStorage(params) {
		TeamsHandler.restoreTeamsHandler();
		setPlayerList(TeamsHandler.getPublicGroup());
		displayContext.toUpdate.forEach((f) => f());
	}

	function clear() {
		setPlayerList([]);
	}

	function updateDisplay() {
		setPlayerList(TeamsHandler.getPublicGroup());
	}

	useEffect(() => {
		displayContext.toClear.push(clear);
		displayContext.toUpdate.push(updateDisplay);
		loadPlayersFromStorage();
	}, []);

	return (
		<div className='flex flex-col items-center'>
			<DisplayContext.Provider value={displayContext}>
				<ImportPlayerList callback={importPlayerList}></ImportPlayerList>
				<TeamCompCard list={playerList} name={'Players'} removeFunc={removePlayer}></TeamCompCard>
				<TeamsDisplay playerList={playerList}></TeamsDisplay>
			</DisplayContext.Provider>
		</div>
	);
};

export default TeamGenerator;
