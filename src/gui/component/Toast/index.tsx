import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

interface ToastProps {
	message: string;
}

export default function Toast(props: ToastProps): JSX.Element {
	const { message } = props;
	const toast = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		setTimeout(() => {
			const e = toast.current;
			if (!e) {
				return;
			}
			e.classList.add('in');
		}, 0);

		setTimeout(() => {
			const e = toast.current;
			if (!e) {
				return;
			}
			e.classList.remove('in');
			e.classList.add('out');
		}, 900);

		setTimeout(() => {
			const overlay = document.getElementById('overlay');
			if (overlay) {
				ReactDOM.unmountComponentAtNode(overlay);
			}
		}, 1200);
	});

	return (
		<div className="toast" ref={toast}>
			{message}
		</div>
	);
}

export function makeToast(message: string): void {
	ReactDOM.render(
		<Toast message={message} />,
		document.getElementById('overlay'),
	);
}
