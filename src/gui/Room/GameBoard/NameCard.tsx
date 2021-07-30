import React from 'react';
import classnames from 'classnames';

import CardModel from '../../../game/NameCard';
import stringifyColor from '../../../util/stringifyColor';

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

	return (
		<button
			type="button"
			className={classnames('name-card', stringifyColor(color), { revealed })}
			onClick={handleFlip}
			onKeyDown={handleKeyDown}
		>
			<span className="name">{name}</span>
		</button>
	);
}
