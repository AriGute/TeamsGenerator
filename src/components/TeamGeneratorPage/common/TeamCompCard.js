import React, { useContext } from 'react';
import PlayerCard from '../PlayerCard';
import { DisplayContext } from '../services/Context';
import TeamsHandler from '../services/TeamsHandler';

const TeamCompCard = ({ list, name, removeFunc }) => {
	const displayContext = useContext(DisplayContext);

	const allowDrop = (e) => {
		e.preventDefault(DisplayContext);
	};

	const drop = (e) => {
		e.preventDefault();
		const player = e.dataTransfer.getData('player');
		const team = name;
		TeamsHandler.addPlayerToPreTeam(player, team);
		displayContext.toUpdate.forEach((f) => f());
	};

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
