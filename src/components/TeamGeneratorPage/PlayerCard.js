import React from 'react';

const playerCard = ({ player, removeFunc }) => {
	function drag(ev) {
		ev.dataTransfer.setData('player', player);
	}

	return (
		<li
			draggable='true'
			onDragStart={drag}
			className='border bg-gray-300 flex justify-between px-3 rounded'>
			{player} {removeFunc && <button onClick={() => removeFunc(player)}>x</button>}
		</li>
	);
};

export default playerCard;
