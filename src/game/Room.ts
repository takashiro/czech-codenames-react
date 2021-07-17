import {
	Context,
	NameCard as CardModel,
} from '@karuta/codenames-core';
import { Room as BasicRoom } from '@karuta/client';

import NameCardHandler from '../cmd/NameCardHandler';

import NameCard from './NameCard';

class Room extends BasicRoom {
	protected cards: NameCard[] = [];

	prepare(): void {
		this.client.on(new NameCardHandler(this.cards));
	}

	getNameCards(): NameCard[] {
		return this.cards;
	}

	async refreshNameCards(): Promise<void> {
		await this.client.post(Context.NameCards);
	}

	async fetchNameCards(): Promise<Partial<CardModel>[]> {
		const cards = await this.client.get(Context.NameCards);
		if (!Array.isArray(cards)) {
			throw new Error('Unexpected cards. It should be an array.');
		}
		return cards as Partial<CardModel>[];
	}

	async flipCard(index: number): Promise<void> {
		await this.client.patch(Context.NameCard, index);
	}
}

export default Room;
