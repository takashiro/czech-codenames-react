
import React from 'react';

import NameCard from './NameCard';

import './index.scss';

class GameBoard extends React.Component {

	constructor(props) {
		super(props);

		this.rowNum = props.row ? props.row : 5;
		this.columnNum = props.column ? props.column : 5;

		const room = this.props.room;
		this.state = {
			cards: room.cards,
		};
		room.on('cardChanged', cards => {
			this.setState({ cards });
		});
	}

	render() {
		const cards = this.state.cards;
		const room = this.props.room;

		const rows = new Array(this.rowNum);
		let k = 0;
		for (let i = 0; i < rows.length; i++) {
			const cells = new Array(this.columnNum);
			for (let j = 0; j < cells.length; j++) {
				let card = cards[k];
				cells[j] = card ? <NameCard key={card.key} room={room} card={card}>{card.name}</NameCard> : null;
				k++;
			}
			rows[i] = <tr key={i}>{cells}</tr>;
		}

		let className = 'game-board';
		if (room.isOwner) {
			className += ' owner';
		}
		return <table className={className}>
			<tbody>
				{rows}
			</tbody>
		</table>;
	}

}

export default GameBoard;
