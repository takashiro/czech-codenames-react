import React from 'react';
import classnames from 'classnames';
import { Color } from '@karuta/codenames-core';

import CardModel from '../../../game/NameCard';
import stringifyColor from '../../../util/stringifyColor';

import './index.scss';

interface ScoreBoardProps {
	title: string;
	color: Color;
	cards: CardModel[];
}

export default function ScoreBoard(props: ScoreBoardProps): JSX.Element {
	const {
		title,
		color,
		cards,
	} = props;

	const [num, setNum] = React.useState(0);

	function updateProgress(): void {
		let count = 0;
		for (const card of cards) {
			if (card.getColor() === color && card.isRevealed()) {
				count++;
			}
		}
		setNum(count);
	}

	React.useEffect(() => {
		for (const card of cards) {
			card.on('revealed', updateProgress);
		}
		return () => {
			for (const card of cards) {
				card.off('revealed', updateProgress);
			}
			setNum(0);
		};
	}, [cards]);

	return (
		<div className={classnames('score-board', stringifyColor(color))}>
			<h4>{title}</h4>
			<span className="score">{num}</span>
		</div>
	);
}
