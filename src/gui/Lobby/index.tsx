import React from 'react';

import { makeToast } from '../component/Toast';

import Room from '../../game/Room';
import Client from '../../game/Client';

import './index.scss';

interface LobbyProps {
	client: Client;
	onRoomEnter?: (room: Room) => void;
}

export default function Lobby(props: LobbyProps): JSX.Element {
	const {
		client,
		onRoomEnter,
	} = props;

	const roomInput = React.useRef<HTMLInputElement>(null);

	async function createRoom(): Promise<void> {
		const room = await client.createRoom();
		if (onRoomEnter) {
			setTimeout(onRoomEnter, 0, room);
		}
	}

	async function enterRoom(): Promise<void> {
		const input = roomInput.current;
		if (!input) {
			return;
		}

		const roomId = parseInt(input.value, 10);
		if (Number.isNaN(roomId) || roomId <= 0) {
			input.value = '';
			input.focus();
			makeToast('请输入正确的房间号。');
			return;
		}

		const room = await client.enterRoom(roomId);
		if (room) {
			if (onRoomEnter) {
				setTimeout(onRoomEnter, 0, room);
			}
		} else {
			input.value = '';
			input.focus();
			makeToast('该房间不存在。');
		}
	}

	return (
		<div className="lobby">
			<div className="create-panel">
				<button type="button" onClick={createRoom}>创建房间</button>
			</div>
			<div className="enter-panel">
				<input type="number" id="room-number" placeholder="房间号" ref={roomInput} />
				<button type="button" onClick={enterRoom}>加入房间</button>
			</div>
		</div>
	);
}
