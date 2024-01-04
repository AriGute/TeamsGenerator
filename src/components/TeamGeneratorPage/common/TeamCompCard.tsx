import React, { useContext } from 'react';
import PlayerCard from '../PlayerCard';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import { DisplayContext } from '../services/Context';
import { Player, Players } from '../services/teamsHandler/TeamsHandlerInterface';

interface TeamCompCardProps {
	Players: Players;
	teamName: number;
	onRemovePlayer?: Function;
}

const TeamCompCard = ({ Players, teamName, onRemovePlayer }: TeamCompCardProps) => {
	let teamList = Players && [...Players];
	const displayContext = useContext(DisplayContext);

	const allowDrop = (dragEvent: React.DragEvent) => {
		dragEvent.preventDefault();
	};

	const drop = (dragEvent: React.DragEvent) => {
		dragEvent.preventDefault();
		const player = dragEvent.dataTransfer.getData('player');
		const currentTeam: unknown = dragEvent.dataTransfer.getData('team');
		const moveToTeam: unknown = teamName;
		if (typeof currentTeam === 'number') TeamsHandler.removePlayerFromTeam(player, currentTeam);
		if (typeof moveToTeam === 'number') TeamsHandler.addPlayerToPreTeam(player, moveToTeam);
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
								teamName={teamName}
								onRemovePlayer={onRemovePlayer}></PlayerCard>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default TeamCompCard;
