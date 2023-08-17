import React, { useState } from 'react';
import TeamCompCard from './common/TeamCompCard';
import { pickTeams, setStoredPlayersList } from '../services/generateTeams';

const TeamsDisplay = ({ playerList }) => {
	const [teamA, setTeamA] = useState([]);
	const [teamB, setTeamB] = useState([]);

	function generateTeamsButton() {
		const teams = pickTeams(playerList);
		setTeamA(teams[0]);
		setTeamB(teams[1]);
	}

	function clearButton() {
		window.dispatchEvent(new Event('clear'));
		setStoredPlayersList([]);
	}

	window.addEventListener('clear', () => {
		setTeamA([]);
		setTeamB([]);
	});

	return (
		<div className='flex items-center rounded'>
			<TeamCompCard list={teamA} name={'Team A'}></TeamCompCard>
			<div className='flex flex-col'>
				<button
					className={`bg-green-300 h-10 p-2 m-2 rounded w-[150px] hover:bg-green-400`}
					onClick={generateTeamsButton}>
					Generate Teams
				</button>
				<button
					className={`bg-red-300 h-10 p-2 m-2 rounded w-[150px] hover:bg-red-400`}
					onClick={clearButton}>
					Clear
				</button>
			</div>
			<TeamCompCard list={teamB} name={'Team B'}></TeamCompCard>
		</div>
	);
};

export default TeamsDisplay;
