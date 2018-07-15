
import React from 'react';

import './index.scss';

class ScoreBoard extends React.Component {

	constructor(props) {
		super(props);

		const color = props.color;
		const room = props.room;
		const config = room.config;

		this.state = {
			num: config[color] || 0,
		};

		room.on('configChanged', config => {
			let num = config[color];
			for (let card of room.cards) {
				if (card.color === color && card.flipped) {
					num--;
				}
			}

			this.setState({num});
		});

		room.on('cardFlipped', card => {
			if (card.color !== color) {
				return;
			}

			this.setState(prev => ({num: prev.num - 1}));
		});
	}

	render() {
		const title = this.props.title || 'Unknown';
		const num = Math.max(0, this.state.num || 0);

		return <div className="score-board">
			<h4>{title}</h4>
			<span className="score">{num}</span>
		</div>;
	}

}

export default ScoreBoard;
