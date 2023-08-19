import React, { useState, useEffect } from 'react';
import Button from './common/Button';
import TeamCompCard from './common/TeamCompCard';
import { teams } from '../utils/consts';
import TeamsHandler from '../services/TeamsHandler';
import { eventsNames } from '../utils/consts';
const TeamsDisplay = ({ playerList }) => {
	const [teamA, setTeamA] = useState([]);
	const [teamB, setTeamB] = useState([]);

	function generateTeamsButton() {
		const teams = TeamsHandler.getRandomTeams();
		setTeamA(teams[0]);
		setTeamB(teams[1]);
	}

	function clearButton() {
		TeamsHandler.clearTeams();
	}

	useEffect(() => {
		const clearListener = window.addEventListener(eventsNames.clear, () => {
			setTeamA([]);
			setTeamB([]);
		});
		const updateTeamsListener = window.addEventListener(eventsNames.updateTeams, () => {
			const teams = TeamsHandler.getPreTeams();
			setTeamA(teams[0]);
			setTeamB(teams[1]);
		});

		return () => {
			window.removeEventListener(clearListener);
			window.removeEventListener(updateTeamsListener);
		};
	}, []);

	return (
		<div className='flex items-center rounded'>
			<TeamCompCard list={teamA} name={teams.A}></TeamCompCard>
			<div className='flex flex-col'>
				<Button text={'Generate Teams'} color={'green'} callback={generateTeamsButton}></Button>
				<Button text={'Clear'} color={'red'} callback={clearButton}></Button>
			</div>
			<TeamCompCard list={teamB} name={teams.B}></TeamCompCard>
		</div>
	);
};

export default TeamsDisplay;
