
import React from 'react';

import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';

import Color from '../../game/Color';

import './index.scss';

class Room extends React.Component {

	constructor(props) {
		super(props);

		this.refreshNameCards = this.refreshNameCards.bind(this);
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
				return room.fetchConfig();
			})
			.then(function () {
				return room.fetchFlippedCards();
			});
		}
	}

	refreshNameCards() {
		let room = this.props.room;
		if (!room) {
			return;
		}

		room.refreshNameCards();
	}

	render() {
		let room = this.props.room;

		return <div className="room">
			<div className="info">房间号 {room.id}</div>
			<div className="score-panel">
				<ScoreBoard
					title="红色阵营"
					room={room}
					color={Color.Red}
				/>
				<ScoreBoard
					title="蓝色阵营"
					room={room}
					color={Color.Blue}
				/>
			</div>
			<div className="current-state"></div>
			<GameBoard room={room} />
			<div className="button-area">
				<button type="button" onClick={this.refreshNameCards}>刷新</button>
			</div>
		</div>;
	}

}

export default Room;
