import React from 'react';
import PlayerCard from '../PlayerCard';
import { eventsNames } from '../../utils/consts';

const TeamCompCard = ({ list, name, removeFunc }) => {
	function allowDrop(e) {
		e.preventDefault();
	}

	function drop(e) {
		e.preventDefault();
		const data = { player: e.dataTransfer.getData('player'), team: name };
		const event = new CustomEvent(eventsNames.addPlayerToPreTeam, { detail: data });
		window.dispatchEvent(event);
	}

	return (
		<div className=' text-center '>
			<h1 className=' underline'>{name + ` [${list.length}]`}</h1>
			<div
				className='w-[300px] min-h-[150px] max-h-[200px] bg-slate-100 rounded overflow-y-auto'
				onDrop={drop}
				onDragOver={allowDrop}>
				<ul>
					{list.map((item, i) => {
						return <PlayerCard key={item + i} player={item} removeFunc={removeFunc}></PlayerCard>;
					})}
				</ul>
			</div>
		</div>
	);
};

export default TeamCompCard;
