import React from 'react';

import CardModel from '../../../game/NameCard';
import NameCard from './NameCard';

import './index.scss';

interface GameBoardProps {
	columnNum: number;
	cards: CardModel[];
}

export default function GameBoard(props: GameBoardProps): JSX.Element {
	const {
		columnNum,
		cards,
	} = props;

	const classNames: string[] = [
		'game-board',
		`col${columnNum}`,
	];

	return (
		<div className={classNames.join(' ')}>
			{cards.map((card) => (
				<NameCard key={card.getKey()} card={card} />
			))}
		</div>
	);
}
