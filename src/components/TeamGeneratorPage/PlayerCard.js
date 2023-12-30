import React from 'react';

const playerCard = ({ player, onRemovePlayer, team }) => {
	const drag = (e) => {
		e.dataTransfer.setData('player', player);
		e.dataTransfer.setData('team', team);
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

export default playerCard;
