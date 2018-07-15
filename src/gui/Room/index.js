
import React from 'react';

import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';

import './index.scss';

class Room extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div className="room">
			<div className="current-state">红方行动</div>
			<GameBoard room={this.props.room} />
			<div className="score-panel">
				<ScoreBoard title="红色阵营" />
				<ScoreBoard title="蓝色阵营" />
			</div>
		</div>;
	}

}

export default Room;
