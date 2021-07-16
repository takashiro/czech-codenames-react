import {
	Context,
	NameCard as CardModel,
} from '@karuta/codenames-core';
import { Room as BasicRoom } from '@karuta/client';

import NameCardHandler from '../cmd/NameCardHandler';

import NameCard from './NameCard';

class Room extends BasicRoom<void> {
	protected cards: NameCard[] = [];

	prepare(): Promise<void> {
		this.socket.on(new NameCardHandler(this.cards));
		return this.loadDriver('@karuta/codenames');
	}

	async refreshNameCards(): Promise<void> {
		await this.socket.post(Context.NameCards);
	}

	async getNameCards(): Promise<Partial<CardModel>[]> {
		const cards = await this.socket.get(Context.NameCards);
		if (!Array.isArray(cards)) {
			throw new Error('Unexpected cards. It should be an array.');
		}
		return cards as Partial<CardModel>[];
	}

	async flipCard(index: number): Promise<void> {
		await this.socket.patch(Context.NameCard, index);
	}
}

export default Room;
