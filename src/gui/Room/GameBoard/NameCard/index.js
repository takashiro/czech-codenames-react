
import React from 'react';

import './index.scss';

import Color from '../../../../game/Color';

class NameCard extends React.Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		const card = this.props.card;
		this.state = {
			color: card.color,
			flipped: card.flipped,
		};
		card.on('colorChanged', color => this.setState({color}));
		card.on('flip', flipped => this.setState({flipped}));
	}

	handleClick(e) {
		e.preventDefault();

		if (this.state.flipped) {
			return;
		}

		const room = this.props.room;
		if (room.isOwner) {
			return;
		}

		const card = this.props.card;
		if (card.flipped) {
			return;
		}
		room.flipCard(card);
	}

	render() {
		let className = ['name-card'];
		if (this.state.color >= 0) {
			let color = Color.fromNum(this.state.color);
			if (color) {
				className.push(color.toLowerCase());
			}
		}

		if (this.state.flipped) {
			className.push('flipped');
		}

		className = className.join(' ');
		return <td className={className} onClick={this.handleClick}>
			<span className="name">{this.props.children}</span>
		</td>;
	}

}

export default NameCard;
