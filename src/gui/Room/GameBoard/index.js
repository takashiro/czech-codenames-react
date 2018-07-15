
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
			names: room.cards.map(card => card.name),
		};
		room.on('cardChanged', cards => {
			this.setState({ names: cards.map(card => card.name) });
		});
	}

	render() {
		const names = this.state.names;

		const rows = new Array(this.rowNum);
		let k = 0;
		for (let i = 0; i < rows.length; i++) {
			const cells = new Array(this.columnNum);
			for (let j = 0; j < cells.length; j++) {
				cells[j] = <td key={j}>
					<NameCard>{names[k]}</NameCard>
				</td>;
				k++;
			}
			rows[i] = <tr key={i}>{cells}</tr>;
		}

		return <table className="game-board">
			<tbody>
				{rows}
			</tbody>
		</table>;
	}

}

export default GameBoard;
