import React from 'react';

import RoomModel from '../../game/Room';

import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';

import './index.scss';

interface RoomProps {
	room: RoomModel;
}

export default function Room(props: RoomProps): JSX.Element {
	const { room } = props;

	function refresh(): void {
		room.refreshNameCards();
	}

	return (
		<div className="room">
			<div className="info">
				房间号
				{room.getId()}
			</div>
			<div className="score-panel">
				<ScoreBoard
					title="红色阵营"
					// color={Color.Red}
				/>
				<ScoreBoard
					title="蓝色阵营"
					// color={Color.Blue}
				/>
			</div>
			<div className="current-state" />
			<GameBoard
				cards={room.getNameCards()}
				columnNum={5}
			/>
			<div className="button-area">
				<button type="button" onClick={refresh}>刷新</button>
			</div>
		</div>
	);
}
