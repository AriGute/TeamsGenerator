import React, { useState } from 'react';
import PlayerCard from '../PlayerCard';

const TeamCompCard = ({ list, name, removeFunc }) => {
	return (
		<div className=' text-center '>
			<h1 className=' underline'>{name + ` [${list.length}]`}</h1>
			<div className='w-[300px] min-h-[150px] max-h-[200px] bg-slate-100 rounded overflow-y-auto'>
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
