import { ChatContainer } from './types';

const API_URL = 'http://localhost:4100';
const requestOptions = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};


export async function getGroups(): Promise<ChatContainer[]> {
	const userId = localStorage.getItem('chatty-user');

	const data = await fetch(`${API_URL}/groups/${userId}`, requestOptions)
		.then(response => {
			return response;
		}).then(data => {
			return data;
		});

	console.log(data);

	return data;
}

export async function getChannels(groupId = '0'): Promise<ChatContainer[]> {
	return [];
}
