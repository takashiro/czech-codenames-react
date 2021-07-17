import React from 'react';

import './index.scss';

interface ScoreBoardProps {
	title: string;
}

export default function ScoreBoard(props: ScoreBoardProps): JSX.Element {
	const {
		title,
	} = props;

	const [num] = React.useState(0);

	return (
		<div className="score-board">
			<h4>{title}</h4>
			<span className="score">{num}</span>
		</div>
	);
}
