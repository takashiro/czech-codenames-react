import React from 'react';
import { createRoot } from 'react-dom/client';
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
	const root = createRoot(document.getElementById('root') as HTMLElement);
	root.render(<App client={client} />);
}());
