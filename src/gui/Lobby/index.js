
import React from 'react';
import ReactDOM from 'react-dom';

import RoomCreator from '../RoomCreator';

import './index.scss';

function createRoom() {
	ReactDOM.render(
		<RoomCreator />,
		document.getElementById('root')
	);
}

function enterRoom() {
}

class Lobby extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div className="lobby">
			<button type="button" onClick={createRoom}>创建房间</button>
			<input type="number" placeholder="房间号" />
			<button type="button" onClick={enterRoom}>加入房间</button>
		</div>;
	}

}

export default Lobby;
