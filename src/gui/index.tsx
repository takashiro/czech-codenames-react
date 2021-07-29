import React from 'react';
import Client from '@karuta/client';

import RoomModel from '../game/Room';

import Lobby from './Lobby';
import Room from './Room';

interface AppProps {
	client: Client;
}

export default function App(props: AppProps): JSX.Element {
	const { client } = props;
	const [room, setRoom] = React.useState<RoomModel | undefined>(undefined);

	async function enterRoom(model: RoomModel): Promise<void> {
		await model.prepare();
		setRoom(model);
	}

	if (room) {
		return (
			<Room
				room={room}
			/>
		);
	}

	return (
		<Lobby
			client={client}
			onRoomEnter={enterRoom}
		/>
	);
}
