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

	if (!userId) {
		return [];
	}
    
	const data = await fetch(`${API_URL}/user/${JSON.parse(userId)}/groups`, requestOptions)
		.then(response => {
			return response;
		}).then(data => {
			return data;
		});

	return await data.json();
}

export async function getChannels(groupId = '0'): Promise<ChatContainer[]> {
	const data = await fetch(`${API_URL}/groups/${groupId}`, requestOptions)
		.then(response => {
			return response;
		}).then(data => {
			return data;
		});

	const group = await data.json();

	return group.channels;
}
