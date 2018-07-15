
import React from 'react';

import './index.scss';

const COLORS = ['', 'red', 'blue', 'yellow', 'assassin'];

class NameCard extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			uncovered: !!props.unclovered
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
	}

	render() {
		let className = ['name-card'];
		if (this.props.color) {
			let color = COLORS[this.props.color];
			if (color) {
				className.push(color);
			}
		}
		if (this.state.uncovered) {
			className.push('uncovered');
		}

		className = className.join(' ');
		return <div className={className} onClick={this.handleClick}>
			<span className="name">{this.props.children}</span>
		</div>;
	}

}

export default NameCard;
