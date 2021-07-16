import React from 'react';
import { Color } from '@karuta/codenames-core';

import CardModel from '../../../game/NameCard';

import './NameCard.scss';

interface NameCardProps {
	card: CardModel;
	onFlip?: (index: number) => void;
}

export default function NameCard(props: NameCardProps): JSX.Element {
	const {
		card,
		onFlip,
	} = props;

	const [name, setName] = React.useState(card.getName());
	const [color, setColor] = React.useState(card.getColor());
	const [revealed, setRevealed] = React.useState(card.isRevealed());

	React.useEffect(() => {
		card.on('nameChanged', setName);
		card.on('colorChanged', setColor);
		card.on('revealed', setRevealed);

		return (): void => {
			card.off('nameChanged', setName);
			card.off('colorChanged', setColor);
			card.off('revealed', setRevealed);
		};
	}, [card]);

	function handleFlip(): void {
		if (onFlip) {
			onFlip(card.getIndex());
		}
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>): void {
		if (e.key === 'Enter' || e.key === 'Space') {
			handleFlip();
		}
	}

	const classNames = ['name-card'];

	switch (color) {
	case Color.Yellow:
		classNames.push('yellow');
		break;
	case Color.Red:
		classNames.push('red');
		break;
	case Color.Blue:
		classNames.push('blue');
		break;
	case Color.Black:
		classNames.push('black');
		break;
	default:
		break;
	}

	if (revealed) {
		classNames.push('revealed');
	}

	return (
		<button type="button" className={classNames.join(' ')} onClick={handleFlip} onKeyDown={handleKeyDown}>
			<span className="name">{name}</span>
		</button>
	);
}
