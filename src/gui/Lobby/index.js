
import React from 'react';
import ReactDOM from 'react-dom';

import Toast from '../component/Toast';
import Room from '../Room';
import net from '../../protocol';
import GameRoom from '../../game/Room';

import './index.scss';

class Lobby extends React.Component {

	constructor(props) {
		super(props);

		this.createRoom = this.createRoom.bind(this);
		this.enterRoom = this.enterRoom.bind(this);
	}

	async createRoom() {
		const client = this.props.client;

		if (!client) {
			return Toast.makeToast('服务器连接失败。');
		}

		const id = await client.request(net.CreateRoom);
		const room = new GameRoom(client, id);
		room.isOwner = true;
		ReactDOM.render(
			<Room room={room} />,
			document.getElementById('root')
		);
	}

	async enterRoom() {
		const client = this.props.client;
		if (!client) {
			return Toast.makeToast('服务器连接失败。');
		}

		let room_input = document.getElementById('room-number');
		if (!room_input) {
			return;
		}

		let room_number = parseInt(room_input.value, 10);
		if (isNaN(room_number) || room_number <= 0) {
			room_input.value = '';
			room_input.focus();
			return Toast.makeToast('请输入正确的房间号。');
		}

		const id = await client.request(net.EnterRoom, room_number);
		if (id && id >= 0) {
			const room = new GameRoom(client, id);
			ReactDOM.render(
				<Room room={room} />,
				document.getElementById('root')
			);
		} else {
			room_input.value = '';
			room_input.focus();
			Toast.makeToast('该房间不存在。');
		}
	}

	render() {
		return <div className="lobby">
			<div className="create-panel">
				<button type="button" onClick={this.createRoom}>创建房间</button>
			</div>
			<div className="enter-panel">
				<input type="number" id="room-number" placeholder="房间号" />
				<button type="button" onClick={this.enterRoom}>加入房间</button>
			</div>
		</div>;
	}

}

export default Lobby;
