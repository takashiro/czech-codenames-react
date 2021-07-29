import {
	Context,
	NameCard as CardModel,
} from '@karuta/codenames-core';
import { ContextListener } from '@karuta/protocol';

import Room from '../game/Room';

export default class NameCardsHandler implements ContextListener {
	readonly context = Context.NameCards;

	protected readonly room: Room;

	constructor(room: Room) {
		this.room = room;
	}

	put(params: unknown): void {
		if (!Array.isArray(params)) {
			return;
		}

		const cardModels = params as Partial<CardModel>[];
		if (cardModels.length !== 25) {
			return;
		}

		this.room.setNameCardModels(cardModels);
	}
}
