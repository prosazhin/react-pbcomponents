import React from 'react';
import style from './button.module.scss';

export const Button = ({ title }) => {
	return (
		<button
			className={style.button}
		>
			{title}
		</button>
	);
};
