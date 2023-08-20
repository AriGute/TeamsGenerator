import React, { useState, useEffect, useContext } from 'react';
import ImportPlayerList from './ImportPlayerList';
import TeamCompCard from './common/TeamCompCard';
import TeamsDisplay from './TeamsDisplay';
import TeamsHandler from './services/TeamsHandler';
import { DisplayContext } from './services/Context';

const TeamGenerator = () => {
	const [playerList, setPlayerList] = useState([]);
	const displayContext = useContext(DisplayContext);

	const onRemovePlayer = (player) => {
		TeamsHandler.removePlayers(player);
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
				<ImportPlayerList onImportPlayerList={onImportPlayerList}></ImportPlayerList>
				<TeamCompCard
					list={playerList}
					name={'Players'}
					onRemovePlayer={onRemovePlayer}></TeamCompCard>
				<TeamsDisplay playerList={playerList}></TeamsDisplay>
			</DisplayContext.Provider>
		</div>
	);
};

export default TeamGenerator;
