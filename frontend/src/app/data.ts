export function getGroups(userId = 1) {
	// TODO: Replace this with the user's groups, dynamically fetched from the server
	//return fetch(`/api/groups/${userId}`).then(response => response.json());

	return [
		{
			label: 'The Rolling Stones',
			id: 1
		},
		{
			label: 'The Who',
			id: 2
		},
		{
			label: 'The Beatles',
			id: 3
		},
		{
			label: 'Billy J Kramer & The Dakotas',
			id: 4
		},
		{
			label: 'The Kinks',
			id: 5
		},
		{
			label: 'The Moody Blues',
			id: 6
		}
	];
}

export function getChannels(userId = 1) {

}
