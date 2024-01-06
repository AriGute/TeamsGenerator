import React, { useContext } from 'react';
import PlayerCard from './PlayerCard';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import { DisplayContext } from '../services/Context';
import { ConstTeamsIndex, Player, Players } from '../services/teamsHandler/TeamsHandlerInterface';

interface TeamCompCardProps {
	Players: Players;
	teamIndex: number;
	onRemovePlayer?: Function;
}

const TeamCompCard = ({ Players, teamIndex, onRemovePlayer }: TeamCompCardProps) => {
	let teamList = Players && [...Players];
	const displayContext = useContext(DisplayContext);
	const teamName: string = (
		teamIndex === ConstTeamsIndex.publicGroup ? 'Public Group' : teamIndex
	).toString();
	const allowDrop = (dragEvent: React.DragEvent) => {
		dragEvent.preventDefault();
	};

	const drop = (dragEvent: React.DragEvent) => {
		dragEvent.preventDefault();
		const player = dragEvent.dataTransfer.getData('player');
		const currentTeam: string = dragEvent.dataTransfer.getData('team');
		const moveToTeam: string = teamName;
		TeamsHandler.removePlayerFromTeam(player, parseInt(currentTeam));
		TeamsHandler.addPlayerToPreTeam(player, parseInt(moveToTeam));
		displayContext.toUpdate.forEach((updateFunction: Function) => updateFunction());
	};

	return (
		<div className=' text-center m-1'>
			<h1 className=' underline'>{`team: ` + teamName + ` [${teamList.length}]`}</h1>
			<div
				className='w-[300px] min-h-[150px] max-h-[200px] bg-slate-100 rounded overflow-y-auto'
				onDrop={drop}
				onDragOver={allowDrop}>
				<ul>
					{teamList.map((player: Player, i: number) => {
						return (
							<PlayerCard
								key={player + i}
								player={player}
								teamName={teamIndex}
								onRemovePlayer={onRemovePlayer}
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default TeamCompCard;
