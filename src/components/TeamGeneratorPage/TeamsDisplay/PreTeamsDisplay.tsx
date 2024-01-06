import React, { useState, useEffect, useContext } from 'react';
import TeamCompCard from './TeamCompCard';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import AddRemoveTeam from './AddRemoveTeam';
import { DisplayContext } from '../services/Context';
import { Team, Teams } from '../services/teamsHandler/TeamsHandlerInterface';

const PreTeamsDisplay = () => {
	const [preTeams, setPreTeams] = useState<Teams>([]);
	const displayContext = useContext(DisplayContext);

	const generateTeamsButton = (): void => {
		const teams: Teams = TeamsHandler.getRandomTeams();
		setPreTeams([...teams]);
	};

	const clearButton = (): void => {
		TeamsHandler.clearTeams();
		displayContext.toClear.forEach((clearFunction: Function) => clearFunction());
	};

	const onClear = (): void => {
		setPreTeams([]);
	};

	const onUpdateDisplay = (): void => {
		const preTeams = TeamsHandler.getPreTeams();
		setPreTeams([...preTeams]);
	};

	useEffect((): void => {
		displayContext.toClear.push(onClear);
		displayContext.toUpdate.push(onUpdateDisplay);
	}, []);

	return (
		<div className=' flex flex-col items-center my-4'>
			<AddRemoveTeam setPreTeams={setPreTeams} />
			<div className='flex items-center justify-center flex-wrap'>
				{preTeams.length === 0 ? (
					<p className=' text-red-500 m-5'>There is 0 teams</p>
				) : (
					preTeams.map((preTeam: Team, i) => {
						const realTeamIndex = i + 1;
						return (
							<TeamCompCard Players={[...preTeam]} teamIndex={realTeamIndex} key={realTeamIndex} />
						);
					})
				)}
			</div>
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
		</div>
	);
};

export default PreTeamsDisplay;
