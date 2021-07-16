import BasicClient from '@karuta/client';
import Room from './Room';

export default class Client extends BasicClient {
	async createRoom(): Promise<Room> {
		const id = await this.postRoom();
		return new Room(this.socket, id);
	}
}
