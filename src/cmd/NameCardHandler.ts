import {
	Context,
	NameCard as CardModel,
} from '@karuta/codenames-core';
import { ContextListener } from '@karuta/protocol';

import NameCard from '../game/NameCard';

export default class NameCardHandler implements ContextListener {
	readonly context = Context.NameCard;

	protected readonly cards: NameCard[];

	constructor(cards: NameCard[]) {
		this.cards = cards;
	}

	put(params: unknown): void {
		const update = params as Partial<CardModel>;
		const { index } = update;
		const card = typeof index === 'number' ? this.cards[index] : undefined;
		if (!card) {
			return;
		}

		const { color } = update;
		if (typeof color === 'number') {
			card.setColor(color);
		}

		const { revealed } = update;
		if (typeof revealed === 'boolean') {
			card.setRevealed(revealed);
		}
	}
}
