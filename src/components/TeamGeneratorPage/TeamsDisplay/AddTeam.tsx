import React, { useContext } from 'react';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';

interface AddRemoveTeamProps {
	setPreTeams: Function;
}

const AddTeam = ({ setPreTeams }: AddRemoveTeamProps) => {
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
