import React from 'react';
import ReactDOM from 'react-dom';
import Client from '@karuta/client';

import App from './gui';

import './index.scss';

function showMessage(message: string): void {
	const box = document.getElementById('message-box');
	if (!box) {
		return;
	}
	box.innerHTML = message;
}

let serverUrl = 'ws://localhost:5260';
if (window.location.protocol === 'https:') {
	const url = window.location.href.match(/^\w+:\/\/(.*?)\//i);
	const domain = url && url[1];
	serverUrl = `wss://${domain}/karuta/`;
}

const client = new Client();

(async function main(): Promise<void> {
	try {
		await client.connect(serverUrl);
		await client.login();
	} catch (error) {
		showMessage('连接服务器失败。');
		return;
	}

	showMessage('');
	ReactDOM.render(
		<App client={client} />,
		document.getElementById('root'),
	);
}());
