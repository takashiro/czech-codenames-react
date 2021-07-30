import React from 'react';
import classnames from 'classnames';
import { Color } from '@karuta/codenames-core';

import stringifyColor from '../../../util/stringifyColor';

import './index.scss';

interface ScoreBoardProps {
	title: string;
	color: Color;
}

export default function ScoreBoard(props: ScoreBoardProps): JSX.Element {
	const {
		title,
		color,
	} = props;

	const [num] = React.useState(0);

	return (
		<div className={classnames('score-board', stringifyColor(color))}>
			<h4>{title}</h4>
			<span className="score">{num}</span>
		</div>
	);
}
