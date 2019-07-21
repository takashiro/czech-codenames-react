
const colors = [
	'assassin',
	'red',
	'blue',
	'yellow',
];

const Color = {
	Assassin: 0,
	Red: 1,
	Blue: 2,
	Yellow: 3,

	fromNum(num) {
		return colors[num];
	}
};

export default Color;
