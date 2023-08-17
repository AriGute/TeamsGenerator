import React, { useState } from 'react';
import { pickTeams, getStoredPlayersList, setStoredPlayersList } from '../services/generateTeams';
import ImportPlayerList from './ImportPlayerList';
import TeamCompCard from './TeamCompCard';

const TeamGenerator = () => {
	const [playerList, setPlayerList] = useState([]);
	const [teamA, setTeamA] = useState([]);
	const [teamB, setTeamB] = useState([]);
	const removeAble = (player) => {
		setPlayerList(playerList.filter((p) => p != player));
	};

	useState(() => {
		const playersList = getStoredPlayersList();
		setPlayerList(playersList);
	}, []);

	return (
		<div className='flex flex-col items-center'>
			<ImportPlayerList
				props={{
					callback: (importPlayers) => {
						const set = new Set();
						[...playerList, ...importPlayers].forEach((player) => {
							set.add(player);
						});
						const spread = [...set];
						setCachedPlayers(spread);
						setPlayerList(spread);
					},
				}}></ImportPlayerList>
			<TeamCompCard list={playerList} name={'Players'} removeFunc={removeAble}></TeamCompCard>
			<div className='flex items-center rounded'>
				<TeamCompCard list={teamA} name={'Team A'}></TeamCompCard>
				<div className='flex flex-col'>
					<button
						className=' bg-green-300 h-10 p-2 m-2 rounded w-[150px] hover:bg-green-400'
						onClick={function (params) {
							const teams = pickTeams(playerList);
							setTeamA(teams[0]);
							setTeamB(teams[1]);
						}}>
						Generate Teams
					</button>
					<button
						className=' bg-red-300 h-10 p-2 m-2 rounded w-[150px] hover:bg-red-400'
						onClick={function (params) {
							setPlayerList([]);
							setTeamA([]);
							setTeamB([]);
							setStoredPlayersList([]);
						}}>
						Clear
					</button>
				</div>
				<TeamCompCard list={teamB} name={'Team B'}></TeamCompCard>
			</div>
		</div>
	);
};

export default TeamGenerator;
