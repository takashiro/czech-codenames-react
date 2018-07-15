
import React from 'react';

import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';

import './index.scss';

class Room extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let room = this.props.room;
		if (!room) {
			return;
		}

		if (room.isOwner) {
			room.load()
			.then(function () {
				return room.refreshNameCards();
			})
			.then(function () {
				return room.fetchColors();
			});
		} else {
			room.fetchNames()
			.then(function () {
				return room.fetchFlippedCards();
			});
		}
	}

	render() {
		let room = this.props.room;

		return <div className="room">
			<div className="info">房间号 {room.id}</div>
			<div className="score-panel">
				<ScoreBoard title="红色阵营" />
				<ScoreBoard title="蓝色阵营" />
			</div>
			<div className="current-state"></div>
			<GameBoard room={room} />
		</div>;
	}

}

export default Room;
