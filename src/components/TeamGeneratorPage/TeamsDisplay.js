import React, { useState, useEffect, useContext } from 'react';
import TeamCompCard from './common/TeamCompCard';
import TeamsHandler from './services/TeamsHandler';
import { DisplayContext } from './services/Context';
import { teams } from '../../utils/consts';

const TeamsDisplay = ({ playerList }) => {
	const [teamA, setTeamA] = useState([]);
	const [teamB, setTeamB] = useState([]);
	const displayContext = useContext(DisplayContext);

	const generateTeamsButton = () => {
		const teams = TeamsHandler.getRandomTeams();
		setTeamA(teams[0]);
		setTeamB(teams[1]);
	};

	const clearButton = () => {
		TeamsHandler.clearTeams();
		displayContext.toClear.forEach((f) => f());
	};

	const clear = () => {
		setTeamA([]);
		setTeamB([]);
	};

	const updateDisplay = () => {
		const teams = TeamsHandler.getPreTeams();
		setTeamA(teams[0]);
		setTeamB(teams[1]);
	};

	useEffect(() => {
		displayContext.toClear.push(clear);
		displayContext.toUpdate.push(updateDisplay);
	}, []);

	return (
		<div className='flex items-center rounded'>
			<TeamCompCard list={teamA} name={teams.A}></TeamCompCard>
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
			<TeamCompCard list={teamB} name={teams.B}></TeamCompCard>
		</div>
	);
};

export default TeamsDisplay;
