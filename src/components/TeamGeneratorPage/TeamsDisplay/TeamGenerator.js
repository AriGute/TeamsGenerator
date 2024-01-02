import React, { useState, useEffect, useContext } from 'react';
import ImportPlayerList from '../ImportPlayerList.js';
import TeamCompCard from '../common/TeamCompCard.js';
import TeamsDisplay from './TeamsDisplay.js';
import TeamsHandler from '../services/teamsHandler/TeamsHandler.js';
import { constTeams } from '../../../utils/consts.js';
import { DisplayContext } from '../services/Context.js';

const TeamGenerator = () => {
	const [playerList, setPlayerList] = useState([]);
	const displayContext = useContext(DisplayContext);

	const onRemovePlayer = (player) => {
		TeamsHandler.removePlayerFromTeam(player, constTeams.publicGroup);
		setPlayerList(TeamsHandler.getPublicGroup());
	};

	const onImportPlayerList = (importPlayers) => {
		TeamsHandler.addPlayers(importPlayers);
		setPlayerList(TeamsHandler.getPublicGroup());
	};

	const loadPlayersFromStorage = (params) => {
		TeamsHandler.restoreTeamsHandler();
		setPlayerList(TeamsHandler.getPublicGroup());
		displayContext.toUpdate.forEach((f) => f());
	};

	const onClear = () => {
		setPlayerList([]);
	};

	const onUpdateDisplay = () => {
		setPlayerList(TeamsHandler.getPublicGroup());
	};

	useEffect(() => {
		displayContext.toClear.push(onClear);
		displayContext.toUpdate.push(onUpdateDisplay);
		loadPlayersFromStorage();
	}, []);

	return (
		<div className='flex flex-col items-center'>
			<DisplayContext.Provider value={displayContext}>
				<ImportPlayerList onImportPlayerList={onImportPlayerList} />
				<TeamCompCard teamSet={playerList} name={'Players'} onRemovePlayer={onRemovePlayer} />
				<TeamsDisplay playerList={playerList} />
			</DisplayContext.Provider>
		</div>
	);
};

export default TeamGenerator;
