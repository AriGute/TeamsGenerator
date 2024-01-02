import React, { useState, useEffect, useContext } from 'react';
import TeamCompCard from '../common/TeamCompCard';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import AddRemoveTeam from './AddRemoveTeam';
import { DisplayContext } from '../services/Context';

const TeamsDisplay = ({ playerList }) => {
	const [preTeams, setPreTeams] = useState([]);
	const displayContext = useContext(DisplayContext);

	const generateTeamsButton = () => {
		const teams = TeamsHandler.getRandomTeams();
		setPreTeams([...teams]);
	};

	const clearButton = () => {
		TeamsHandler.clearTeams();
		displayContext.toClear.forEach((f) => f());
	};

	const onClear = () => {
		setPreTeams([]);
	};

	const onUpdateDisplay = () => {
		setPreTeams([...TeamsHandler.getPreTeams()]);
	};

	useEffect(() => {
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
					preTeams.map((preTeam, i) => {
						return <TeamCompCard teamSet={preTeam} name={i} key={i} />;
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

export default TeamsDisplay;
