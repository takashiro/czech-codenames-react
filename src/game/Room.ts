import {
	Context,
	NameCard as CardModel,
} from '@karuta/codenames-core';
import Client, {
	Room as BasicRoom,
	RoomConfiguration,
	Driver,
} from '@karuta/client';

import NameCardHandler from '../cmd/NameCardHandler';
import NameCardsHandler from '../cmd/NameCardsHandler';

import NameCard from './NameCard';

interface Room {
	on(event: 'configChanged', listener: (config?: RoomConfiguration) => void): this;
	on(event: 'cardsChanged', listener: (cards: NameCard[]) => void): this;

	once(event: 'configChanged', listener: (config?: RoomConfiguration) => void): this;
	once(event: 'cardsChanged', listener: (cards: NameCard[]) => void): this;

	off(event: 'configChanged', listener: (config?: RoomConfiguration) => void): this;
	off(event: 'cardsChanged', listener: (cards: NameCard[]) => void): this;

	emit(event: 'configChanged', config?: RoomConfiguration): boolean;
	emit(event: 'cardsChanged', cards: NameCard[]): boolean;
}

class Room extends BasicRoom {
	protected cards: NameCard[] = [];

	protected driver: Driver<void>;

	constructor(client: Client) {
		super(client);
		this.driver = new Driver<void>(this.client, '@karuta/codenames');
	}

	async prepare(): Promise<void> {
		this.client.on(new NameCardHandler(this.cards));
		this.client.on(new NameCardsHandler(this));
		await this.driver.load();
		await this.refreshNameCards();
	}

	getNameCards(): NameCard[] {
		return this.cards;
	}

	setNameCards(cards: NameCard[]): void {
		this.cards = cards;
		this.emit('cardsChanged', cards);
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
