import { Player } from '../services/teamsHandler/TeamsHandlerInterface';
import React from 'react';

interface PlayerCardProps {
	player: Player;
	teamName: number;
	onRemovePlayer?: Function;
}

const PlayerCard = ({ player, teamName, onRemovePlayer }: PlayerCardProps) => {
	const drag = (dragEvent: React.DragEvent) => {
		if (dragEvent?.dataTransfer) {
			dragEvent.dataTransfer.setData('player', player);
			dragEvent.dataTransfer.setData('team', teamName.toString());
		}
	};

	return (
		<li
			draggable='true'
			onDragStart={drag}
			className='border bg-gray-300 flex justify-between px-3 rounded'>
			{player} {onRemovePlayer && <button onClick={() => onRemovePlayer(player)}>x</button>}
		</li>
	);
};

export default PlayerCard;
