import React from 'react';
import classNames from 'classnames';
import { Color } from '@karuta/codenames-core';

import RoomModel from '../../game/Room';

import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';

import './index.scss';

interface RoomProps {
	room: RoomModel;
}

export default function Room(props: RoomProps): JSX.Element {
	const { room } = props;

	const [cards, setCards] = React.useState(room.getNameCards());
	room.on('cardsChanged', setCards);

	function refresh(): void {
		room.refreshNameCards();
	}

	function flip(index: number): void {
		room.flipCard(index);
	}

	const owner = room.isCreated();

	return (
		<div className={classNames('room', { owner })}>
			<div className="info">
				房间号
				{room.getId()}
			</div>
			<div className="score-panel">
				<ScoreBoard
					title="红色阵营"
					color={Color.Red}
				/>
				<ScoreBoard
					title="蓝色阵营"
					color={Color.Blue}
				/>
			</div>
			<div className="current-state" />
			<GameBoard
				cards={cards}
				columnNum={5}
				onFlip={flip}
			/>
			{owner && (
				<div className="button-area">
					<button type="button" onClick={refresh}>刷新</button>
				</div>
			)}
		</div>
	);
}
