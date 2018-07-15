
import React from 'react';
import ReactDOM from 'react-dom';

import Lobby from './gui/Lobby';
import Client from './net/Client';

import './index.scss';

function showMessage(message) {
	var box = document.getElementById('message-box');
	box.innerHTML = message;
}

let ws_url = 'ws://localhost:2517';
if (location.href.startsWith('https://')) {
	let url = location.href.match(/^\w+:\/\/(.*?)\//i);
	let domain = url && url[1];
	ws_url = 'wss://' + domain + '/karuta/';
}

let client = new Client(ws_url);
client.connect()
.then(function () {
	showMessage('');

	ReactDOM.render(
		<Lobby client={client} />,
		document.getElementById('root')
	);
})
.catch(() => {
	showMessage('连接服务器失败。');
});
