import {
	Context,
	NameCard as CardModel,
} from '@karuta/codenames-core';
import { ContextListener } from '@karuta/protocol';

import Room from '../game/Room';

export default class NameCardHandler implements ContextListener {
	readonly context = Context.NameCard;

	protected readonly room: Room;

	constructor(room: Room) {
		this.room = room;
	}

	patch(params: unknown): void {
		const update = params as Partial<CardModel>;
		const { index } = update;
		const card = typeof index === 'number' ? this.room.getNameCard(index) : undefined;
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
