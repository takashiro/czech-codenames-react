import { Color } from '@karuta/codenames-core';

export default function stringifyColor(color: Color): string {
	switch (color) {
	case Color.Yellow:
		return 'yellow';
	case Color.Red:
		return 'red';
	case Color.Blue:
		return 'blue';
	case Color.Black:
		return 'black';
	default:
		break;
	}
	return 'unknown';
}
