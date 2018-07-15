
import React from 'react';

import './index.scss';

class ScoreBoard extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const title = this.props.title || 'Unknown';
		const score = this.props.score || 0;

		return <div className="score-board">
			<h4>{title}</h4>
			<span className="score">{score}</span>
		</div>;
	}

}

export default ScoreBoard;
