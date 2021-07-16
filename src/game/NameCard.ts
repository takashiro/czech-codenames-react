import EventEmitter from 'events';
import { Color } from '@karuta/codenames-core';

let cardKey = 1;

interface NameCard {
	on(event: 'nameChanged', listener: (name: string) => void): this;
	on(event: 'colorChanged', listener: (color: Color) => void): this;
	on(event: 'flipped', listener: (flipped: boolean) => void): this;

	once(event: 'nameChanged', listener: (name: string) => void): this;
	once(event: 'colorChanged', listener: (color: Color) => void): this;
	once(event: 'flipped', listener: (flipped: boolean) => void): this;

	off(event: 'nameChanged', listener: (name: string) => void): this;
	off(event: 'colorChanged', listener: (color: Color) => void): this;
	off(event: 'flipped', listener: (flipped: boolean) => void): this;

	emit(event: 'nameChanged', name: string): boolean;
	emit(event: 'colorChanged', color: Color): boolean;
	emit(event: 'flipped', flipped: boolean): boolean;
}

class NameCard extends EventEmitter {
	protected key = cardKey++;

	protected index: number;

	protected name: string;

	protected color = Color.Unknown;

	protected flipped = false;

	constructor(index: number, name: string) {
		super();

		this.index = index;
		this.name = name;
	}

	getKey(): number {
		return this.key;
	}

	getIndex(): number {
		return this.index;
	}

	getName(): string {
		return this.name;
	}

	setName(name: string): void {
		this.name = name;
		this.emit('nameChanged', name);
	}

	getColor(): Color {
		return this.color;
	}

	setColor(color: Color): void {
		this.color = color;
		this.emit('colorChanged', color);
	}

	isFlipped(): boolean {
		return this.flipped;
	}

	setFlipped(flipped: boolean): void {
		this.flipped = flipped;
		this.emit('flipped', flipped);
	}
}

export default NameCard;
