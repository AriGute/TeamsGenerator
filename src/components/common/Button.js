import React from 'react';

const Button = ({ text, color, callback }) => {
	const style = `bg-${color}-300 h-10 p-2 m-2 rounded w-[150px] hover:bg-${color}-400`;
	return (
		<button className={style} onClick={callback}>
			{text}
		</button>
	);
};

export default Button;
