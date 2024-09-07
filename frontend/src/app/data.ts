import { Group } from './types';

export function getGroups(userId = 1): Group[] {
	// TODO: Replace this with the user's groups, dynamically fetched from the server
	//return fetch(`/api/groups/${userId}`).then(response => response.json());

	return [
		{
			label: 'The Rolling Stones',
			id: 1,
			avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/The_Rolling_Stones_logo.svg/1200px-The_Rolling_Stones_logo.svg.png'
		},
		{
			label: 'The Who',
			id: 2,
			avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/The_Who_logo.svg/1200px-The_Who_logo.svg.png'
		},
		{
			label: 'The Beatles',
			id: 3,
			avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/The_Beatles_Logo.svg/1200px-The_Beatles_Logo.svg.png'
		},
		{
			label: 'Billy J Kramer & The Dakotas',
			id: 4,
			avatar: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Billy_J_Kramer_%26_The_Dakotas.jpg'
		},
		{
			label: 'The Kinks',
			id: 5,
			avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/The_Kinks_logo.svg/1200px-The_Kinks_logo.svg.png'
		},
		{
			label: 'The Moody Blues',
			id: 6,
			avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/The_Moody_Blues_logo.svg/1200px-The_Moody_Blues_logo.svg.png'
		}
	];
}

export function getChannels(userId = 1) {

}
