
import React from 'react';
import ReactDOM from 'react-dom';

import Lobby from './gui/Lobby';
import Client from './net/Client';

import './index.scss';

function showMessage(message) {
	var box = document.getElementById('message-box');
	box.innerHTML = message;
}

let client = new Client('ws://localhost:2517');
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
