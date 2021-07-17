import BasicClient from '@karuta/client';
import Room from './Room';

export default class Client extends BasicClient {
	async createRoom(): Promise<Room> {
		if (!this.socket) {
			throw new Error('Connection lost.');
		}
		const id = await this.postRoom();
		return new Room(this.socket, id);
	}

	async enterRoom(id: number): Promise<Room | undefined> {
		if (!this.socket) {
			throw new Error('Connection lost.');
		}
		const succeeded = await this.getRoom(id);
		if (succeeded) {
			return new Room(this.socket, id);
		}
	}
}
