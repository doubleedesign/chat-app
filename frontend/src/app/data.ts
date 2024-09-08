import { Group } from './types';

export function getGroups(userId = 1): Group[] {
	// TODO: Replace this with the user's groups, dynamically fetched from the server
	//return fetch(`/api/groups/${userId}`).then(response => response.json());

	return [
		{
			label: 'The Spice Girls',
			id: 1,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/aQSj_rM0qgWlcxVHcvR-idjHhLucjTe04YPd--y4H8s/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ0NDYx/Mi0xMzAyNjMyODAz/LmpwZWc.jpeg'
		},
		{
			label: 'The Corrs',
			id: 2,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/5BubiD9jioVFvzj90ZRVMdK8DO4S_z5CEteqZBMZ0Xc/rs:fit/g:sm/q:90/h:596/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY4NDY4/My0xMzcyNTk0ODUy/LTc2MDAuanBlZw.jpeg'
		},
		{
			label: 'Savage Garden',
			id: 3,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/KGi0_b-uOqudwo3Gvem3aO2Y52QPwc64W0AlI-uSO_g/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTUzMTc5/MS0xNTkyNjc1NjY2/LTM1NDMuanBlZw.jpeg'
		},
		{
			label: 'Bachelor Girl',
			id: 4,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/KDvvcfEM4CzYd0C-gE0zRTVMhyZTp7dlW8kbU2Ip7Is/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNTM5/NDYwLTE1MTgxMzg4/NTEtMjI1NS5qcGVn.jpeg'
		},
		{
			label: '4 Non Blondes',
			id: 5,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/fOKkY7gXbVboO6TiEe2cH4CZ4vRhosyHXTmTYb4LQP0/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE5ODU5/MS0xNTUyNjI3Mjk3/LTI1NDcuanBlZw.jpeg'
		},
		{
			label: 'The Backstreet Boys',
			id: 6,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/j8gCwNoE6_xRzVZv11_BeAFleC4R63rMw1F-I6qeXig/rs:fit/g:sm/q:90/h:597/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNTIx/NzItMTI5NTkzMDkx/NC5qcGVn.jpeg'
		},
		{
			label: 'S Club 7',
			id: 7,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/MyQsu4v4p_2iPgSQzS460iJJx3ywIeJ8aYoc8xqzQMM/rs:fit/g:sm/q:90/h:450/w:450/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY2NDI3/My0xMTQ1MDQ3NDcw/LmpwZWc.jpeg'
		},
		{
			label: 'Ace of Base',
			id: 8,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/vSXT9C-9yGUWA5run_52ZxxvjC3g6op36hApjbdsnYM/rs:fit/g:sm/q:90/h:519/w:549/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTM3MjMx/LTEzNjA4ODQ4NDQt/NTU4Mi5qcGVn.jpeg'
		},
		{
			label: 'B*Witched',
			id: 9,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/keCu4T9AXS9TZCFKvm9bzBbxxmvS9STmxaKixtwVprE/rs:fit/g:sm/q:90/h:297/w:297/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3MjQx/Ny0xMjMwMTA0MjQ5/LmpwZWc.jpeg'
		},
		{
			label: 'Aqua',
			id: 10,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/pX8Nmu5nAhlYwoPpGfFBcgqRwvvveDrQQXrY4hLMyAE/rs:fit/g:sm/q:90/h:598/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIxMzAz/MzAtMTQ5NzM2NDc2/Ny0yMzk3LmpwZWc.jpeg'
		},
		{
			label: 'The Red Hot Chili Peppers',
			id: 11,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/TBFMsp_ki2nO56jvJ4CR7X5KwWGv1Apai7DPg-3usyI/rs:fit/g:sm/q:90/h:590/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM3NTQ5/MS0xNTA3MjkyNTg2/LTE5NDIuanBlZw.jpeg'
		},
		{
			label: 'The Smashing Pumpkins',
			id: 12,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/l1PNRmtpVQh744KALki6eu3xlH18lJySc4vmWg5TAuc/rs:fit/g:sm/q:90/h:242/w:374/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU1NDg3/ODctMTM5NjI0ODAy/Mi03NDIwLmpwZWc.jpeg'
		},
		{
			label: 'Oasis',
			id: 13,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/lOIGRPn1EPtNfNGOTTa9yDu43DRn_eV6rYyAp0cE2Rc/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM3MTM0/MS0xMjYyNjEyMzAw/LmpwZWc.jpeg'
		},
		{
			label: 'The Cranberries',
			id: 14,
			// eslint-disable-next-line max-len
			avatar: 'https://i.discogs.com/lG99rWxmwcCAOGWpNRN5OLkusOy-IfZrkzD8tKFN-AU/rs:fit/g:sm/q:90/h:600/w:598/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ0MTA3/Ni0xMzUwOTM1NDUz/LTc3MjcuanBlZw.jpeg'
		}
	];
}

export function getChannels(userId = 1) {

}
