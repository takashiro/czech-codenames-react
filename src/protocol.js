
import net from './net/protocol';
import Enum from './net/Enum';

const cmd = new Enum(
	...net.enums,

	'RefreshNameCards',
	'FetchNames',
	'FetchColors',
	'FlipCard',
	'FetchFlippedCards',
);

export default cmd;
