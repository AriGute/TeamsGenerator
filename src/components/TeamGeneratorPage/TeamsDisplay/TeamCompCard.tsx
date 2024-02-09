import React, { useContext, useState } from 'react';
import PlayerCard from './PlayerCard';
import TeamsHandler from '../services/teamsHandler/TeamsHandler';
import { DisplayContext } from '../services/Context';
import { ConstTeamsIndex, Player, Players } from '../services/teamsHandler/TeamsHandlerInterface';
import './TeamCompCard.css';
interface TeamCompCardProps {
	players: Players;
	teamIndex: number;
	onRemovePlayer?: (player: Player) => void;
}

const TeamCompCard = ({ players, teamIndex, onRemovePlayer }: TeamCompCardProps) => {
	const teamList = players && [...players];
	const displayContext = useContext(DisplayContext);
	const teamName: string = (
		teamIndex === ConstTeamsIndex.publicGroup ? 'Public Group' : teamIndex
	).toString();

	const allowDrop = (dragEvent: React.DragEvent) => {
		dragEvent.preventDefault();
	};

	const removeTeam = (): void => {
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
			<div className=' flex justify-between items-center h-7 bg-gray-400 content-evenly'>
				<h1 className=' mx-2 text-white select-none'>
					{`Team: ` + teamName + ` [${teamList.length}]`}
				</h1>
				{teamIndex !== ConstTeamsIndex.publicGroup && (
					<button
						className=' transition ease-in-out h-7 w-7 bg-gray-500 hover:bg-gray-600 select-none'
						onClick={removeTeam}>
						x
					</button>
				)}
			</div>

			<div
				className=' w-[400px] h-[150px] max-h-[150px] bg-slate-100 rounded overflow-y-auto TeamCompCardScroll'
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
