import React, { useContext } from 'react';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import { DisplayContext } from '../services/Context';

const AddRemoveTeam = ({ setPreTeams }) => {
	const displayContext = useContext(DisplayContext);

	const addTeam = () => {
		TeamsHandler.addTeam();
		setPreTeams([...TeamsHandler.getPreTeams()]);
	};

	const removeTeam = () => {
		TeamsHandler.removeTeam();
		setPreTeams([...TeamsHandler.getPreTeams()]);
		displayContext.toUpdate.forEach((f) => f());
	};
	return (
		<div className=' flex flex-row'>
			<button
				className={` mx-2 h-4 w-4 h-8 w-8 bg-green-300 hover:bg-green-400 rounded-full`}
				onClick={addTeam}>
				+
			</button>
			<button
				className={` mx-2 h-4 w-4 h-8 w-8 bg-red-300 hover:bg-red-400 rounded-full`}
				onClick={removeTeam}>
				-
			</button>
		</div>
	);
};

export default AddRemoveTeam;
