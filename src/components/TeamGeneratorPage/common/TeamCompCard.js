import React, { useContext } from 'react';
import PlayerCard from '../PlayerCard';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import { DisplayContext } from '../services/Context';

/**
 * @param {Set} team
 * @param {string} name
 * @param {function} onRemovePlayer
 */
const TeamCompCard = ({ teamSet, name: teamName, onRemovePlayer }) => {
	let teamList = teamSet && [...teamSet];
	const displayContext = useContext(DisplayContext);

	const allowDrop = (e) => {
		e.preventDefault();
	};

	const drop = (e) => {
		e.preventDefault();
		const player = e.dataTransfer.getData('player');
		const currentTeam = e.dataTransfer.getData('team');
		const moveToTeam = teamName;

		TeamsHandler.removePlayerFromTeam(player, currentTeam);
		TeamsHandler.addPlayerToPreTeam(player, moveToTeam);
		displayContext.toUpdate.forEach((f) => f());
	};

	return (
		<div className=' text-center m-1'>
			<h1 className=' underline'>{`team: ` + teamName + ` [${teamList.length}]`}</h1>
			<div
				className='w-[300px] min-h-[150px] max-h-[200px] bg-slate-100 rounded overflow-y-auto'
				onDrop={drop}
				onDragOver={allowDrop}>
				<ul>
					{teamList.map((item, i) => {
						return (
							<PlayerCard
								key={item + i}
								player={item}
								onRemovePlayer={onRemovePlayer}
								team={teamName}></PlayerCard>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default TeamCompCard;
