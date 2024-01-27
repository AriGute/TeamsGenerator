import React, { useContext, useState } from 'react';
import PlayerCard from './PlayerCard';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import { DisplayContext } from '../services/Context';
import { ConstTeamsIndex, Player, Players } from '../services/teamsHandler/TeamsHandlerInterface';

interface TeamCompCardProps {
	players: Players;
	teamIndex: number;
	onRemovePlayer?: (player: Player) => void;
}

const TeamCompCard = ({ players, teamIndex, onRemovePlayer }: TeamCompCardProps) => {
	const teamList = players && [...players];
	const [destroy, setDestroy] = useState(false);
	const displayContext = useContext(DisplayContext);
	const teamName: string = (
		teamIndex === ConstTeamsIndex.publicGroup ? 'Public Group' : teamIndex
	).toString();

	const allowDrop = (dragEvent: React.DragEvent) => {
		dragEvent.preventDefault();
	};

	const removeTeam = (): void => {
		setDestroy(true);
		TeamsHandler.removeTeam(teamIndex);
		displayContext.toUpdate.forEach((updateFunction: Function) => updateFunction());
	};

	const drop = (dragEvent: React.DragEvent) => {
		dragEvent.preventDefault();
		const player = dragEvent.dataTransfer.getData('player');
		const currentTeam: string = dragEvent.dataTransfer.getData('team');
		const moveToTeam: string = teamIndex.toString();
		TeamsHandler.removePlayerFromTeam(player, parseInt(currentTeam));
		TeamsHandler.addPlayerToPreTeam(player, parseInt(moveToTeam));
		displayContext.toUpdate.forEach((updateFunction: Function) => updateFunction());
	};

	return (
		<div className=' text-center m-1 '>
			<div className=' flex flex-row justify-center'>
				<h1 className=' underline'>{`team: ` + teamName + ` [${teamList.length}]`}</h1>
				{teamIndex !== ConstTeamsIndex.publicGroup && (
					<button
						className=' transition ease-in-out mx-2 h-8 w-8 bg-red-300 hover:bg-red-400 rounded-full'
						onClick={removeTeam}>
						-
					</button>
				)}
			</div>

			<div
				className=' w-[300px] min-h-[150px] max-h-[200px] bg-slate-100 rounded overflow-y-auto TeamCompCardAppear'
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
