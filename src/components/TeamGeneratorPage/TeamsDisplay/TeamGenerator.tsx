import React, { useState, useEffect, useContext } from 'react';
import ImportPlayerList from '../ImportPlayerList';
import TeamCompCard from '../common/TeamCompCard';
import TeamsDisplay from './TeamsDisplay';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import { DisplayContext } from '../services/Context';
import {
	ConstTeamsIndex,
	Player,
	Players,
} from '../services/teamsHandler/TeamsHandlerInterface.js';

const TeamGenerator = () => {
	const [players, setPlayerList] = useState<Players>([]);
	const displayContext = useContext(DisplayContext);

	const onRemovePlayer = (player: Player): void => {
		TeamsHandler.removePlayerFromTeam(player, ConstTeamsIndex.publicGroup);
		setPlayerList(TeamsHandler.getPublicGroup());
	};

	const onImportPlayerList = (importPlayers: Player[]): void => {
		TeamsHandler.addPlayers(importPlayers);
		setPlayerList(TeamsHandler.getPublicGroup());
	};

	const loadPlayersFromStorage = (): void => {
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
				<TeamCompCard
					Players={players}
					teamName={ConstTeamsIndex.publicGroup}
					onRemovePlayer={onRemovePlayer}
				/>
				<TeamsDisplay players={players} />
			</DisplayContext.Provider>
		</div>
	);
};

export default TeamGenerator;
