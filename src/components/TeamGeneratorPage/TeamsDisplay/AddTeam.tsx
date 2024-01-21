import React, { useContext } from 'react';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import { DisplayContext } from '../services/Context';

interface AddRemoveTeamProps {
	setPreTeams: Function;
}

const AddTeam = ({ setPreTeams }: AddRemoveTeamProps) => {
	const displayContext = useContext(DisplayContext);

	const addTeam = (): void => {
		TeamsHandler.addTeam();
		setPreTeams([...TeamsHandler.getPreTeams()]);
	};

	return (
		<div className=' flex flex-row'>
			<button
				className={` transition ease-in-out mx-2 h-8 w-8 bg-green-300 hover:bg-green-400 rounded-full`}
				onClick={addTeam}>
				+
			</button>
		</div>
	);
};

export default AddTeam;
