import React, { useState, useEffect, useContext } from 'react';
import TeamCompCard from './TeamCompCard';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import AddTeam from './AddTeam';
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

	useEffect(() => {
		displayContext.toClear.push(onClear);
		displayContext.toUpdate.push(onUpdateDisplay);
	}, []);

	return (
		<div className=' h-[300px] flex flex-col items-center my-4'>
			<AddTeam setPreTeams={setPreTeams} />
			<div className='flex items-center justify-center flex-wrap'>
				{preTeams.length === 0 ? (
					<p className=' text-red-500 m-5'>There is 0 teams</p>
				) : (
					preTeams.map((preTeam: Team, i) => {
						const realTeamIndex = i + 1;
						return (
							<TeamCompCard
								players={[...preTeam.players]}
								teamIndex={realTeamIndex}
								key={preTeam.id}
							/>
						);
					})
				)}
			</div>
			<div className='flex flex-col'>
				<button
					className={` transition ease-in-out bg-green-300 h-10 p-2 m-2 rounded w-[150px] hover:bg-green-400`}
					onClick={generateTeamsButton}>
					Generate Teams
				</button>
				<button
					className={`transition ease-in-out bg-red-300 h-10 p-2 m-2 rounded w-[150px] hover:bg-red-400`}
					onClick={clearButton}>
					Clear
				</button>
			</div>
		</div>
	);
};

export default PreTeamsDisplay;
