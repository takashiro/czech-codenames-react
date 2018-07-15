
import EventEmitter from 'events';

import cmd from '../protocol';
import NameCard from './NameCard';

function bindEvents(client) {
	client.bind(cmd.FetchNames, names => {
		let cards = names.map((name, index) => new NameCard(index, name));
		this.cards = cards;
		this.emit('cardChanged', cards);
	});

	client.bind(cmd.FetchColors, colors => {
		let cards = this.cards;
		for (let i = 0; i < cards.length; i++) {
			cards[i].setColor(colors[i]);
		}
	});

	client.bind(cmd.FlipCard, info => {
		if (info && info.index >= 0) {
			let card = this.cards[info.index];
			if (card) {
				card.setColor(info.color);
				card.setFlipped(true);
			} else {
				card.setColor(0);
				card.setFlipped(false);
			}
		}
	});
}

class Room extends EventEmitter {

	constructor(client, id) {
		super();

		this.client = client;
		this.id = id;
		this.cards = [];
		bindEvents.call(this, client);
	}

	load() {
		return this.client.request(cmd.LoadGame, 'codenames');
	}

	refreshNameCards() {
		return this.client.request(cmd.RefreshNameCards);
	}

	fetchNames() {
		return this.client.request(cmd.FetchNames);
	}

	fetchColors() {
		return this.client.request(cmd.FetchColors);
	}

	flipCard(card) {
		this.client.send(cmd.FlipCard, card.index);
	}

	fetchFlippedCards() {
		this.client.send(cmd.FetchFlippedCards);
	}

}

export default Room;
