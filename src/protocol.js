
import net from '@karuta/client/cmd';

const cmd = {
	...net,

	RefreshNameCards: 1,
	FetchNames: 2,
	FetchColors: 3,
	FlipCard: 4,
	FetchFlippedCards: 5,
	FetchConfig: 6,
};

export default cmd;
