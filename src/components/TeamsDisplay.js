import React, { useState } from 'react';
import Button from './common/Button';
import TeamCompCard from './common/TeamCompCard';
import { pickTeams } from '../services/generateTeams';

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
	}

	window.addEventListener('clear', () => {
		setTeamA([]);
		setTeamB([]);
	});

	return (
		<div className='flex items-center rounded'>
			<TeamCompCard list={teamA} name={'Team A'}></TeamCompCard>
			<div className='flex flex-col'>
				<Button text={'Generate Teams'} color={'green'} callback={generateTeamsButton}></Button>
				<Button text={'Clear'} color={'red'} callback={clearButton}></Button>
			</div>
			<TeamCompCard list={teamB} name={'Team B'}></TeamCompCard>
		</div>
	);
};

export default TeamsDisplay;
