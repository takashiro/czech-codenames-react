import React from 'react';

import CardModel from '../../../game/NameCard';
import NameCard from './NameCard';

import './index.scss';

interface GameBoardProps {
	columnNum: number;
	cards: CardModel[];
	onFlip?: (index: number) => void;
}

export default function GameBoard(props: GameBoardProps): JSX.Element {
	const {
		columnNum,
		cards,
		onFlip,
	} = props;

	const classNames: string[] = [
		'game-board',
		`col${columnNum}`,
	];

	return (
		<div className={classNames.join(' ')}>
			{cards.map((card) => (
				<NameCard
					key={card.getKey()}
					card={card}
					onFlip={onFlip}
				/>
			))}
		</div>
	);
}
