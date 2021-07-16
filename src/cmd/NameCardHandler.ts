import {
	Context,
	NameCard as CardModel,
} from '@karuta/codenames-core';
import { ContextListener } from '@karuta/protocol';

import NameCard from '../game/NameCard';

export default class NameCardHandler implements ContextListener {
	readonly context: Context.NameCard;

	protected readonly cards: NameCard[];

	constructor(cards: NameCard[]) {
		this.cards = cards;
	}

	put(params: Partial<CardModel>): void {
		const { index } = params;
		const card = this.cards[index];
		if (!card) {
			return;
		}

		const { color } = params;
		if (color) {
			card.setColor(color);
		}

		const { revealed } = params;
		card.setRevealed(revealed);
	}
}
