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

	protected created = false;

	constructor(client: Client) {
		super(client);
		this.driver = new Driver<void>(this.client, '@karuta/codenames');

		client.on(new NameCardHandler(this));
		client.on(new NameCardsHandler(this));
	}

	isCreated(): boolean {
		return this.created;
	}

	async create(): Promise<void> {
		await super.create();
		await this.driver.load();
		await this.refreshNameCards();
		this.created = true;
	}

	async enter(id: number): Promise<boolean> {
		const success = await super.enter(id);
		if (success) {
			await this.fetchNameCards();
		}
		return success;
	}

	getNameCards(): NameCard[] {
		return this.cards;
	}

	setNameCards(cards: NameCard[]): void {
		this.cards = cards;
		this.emit('cardsChanged', cards);
	}

	getNameCard(index: number): NameCard | undefined {
		return this.cards[index];
	}

	setNameCardModels(models: Partial<CardModel>[]): void {
		const cards = models.map((model, i) => new NameCard(i, model.name || '', model.color, model.revealed));
		this.setNameCards(cards);
	}

	async refreshNameCards(): Promise<void> {
		await this.client.post(Context.NameCards);
	}

	async fetchNameCards(): Promise<void> {
		const models = await this.client.get(Context.NameCards) as Partial<CardModel>[];
		if (!Array.isArray(models)) {
			throw new Error('Unexpected cards. It should be an array.');
		}
		this.setNameCardModels(models);
	}

	async flipCard(index: number): Promise<void> {
		await this.client.patch(Context.NameCard, { index });
	}
}

export default Room;
