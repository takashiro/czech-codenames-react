
import EventEmitter from 'events';

import cmd from '../protocol';
import NameCard from './NameCard';

function bindEvents(client) {
	client.bind(cmd.FetchNames, names => {
		let cards = names.map(name => new NameCard(name));
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
		if (info && info.index) {
			let card = this.cards[info.index];
			if (card) {
				card.setColor(info.color);
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

	refreshNameCards() {
		this.client.send(cmd.RefreshNameCards);
	}

	fetchNames() {
		this.client.send(cmd.FetchNames);
	}

	fetchColors() {
		this.client.send(cmd.FetchColors);
	}

	flipCard(index) {
		this.client.send(cmd.FlipCard, index);
	}

}

export default Room;
