
import EventEmitter from 'events';

class NameCard extends EventEmitter {

	constructor(index, name) {
		super();

		this.index = index;
		this.name = name;
		this.color = undefined;
		this.flipped = false;
	}

	setName(name) {
		this.name = name;
		this.emit('nameChanged', name);
	}

	setColor(color) {
		this.color = color;
		this.emit('colorChanged', color);
	}

	setFlipped(flipped) {
		this.flipped = flipped;
		this.emit('flip', flipped);
	}

}

export default NameCard;
