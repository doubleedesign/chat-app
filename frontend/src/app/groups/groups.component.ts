import { Component } from '@angular/core';
import { TabConfig } from '../types';
import { TabsContainer } from '../tabs-container/tabs-container.component';
import { getGroups } from '../data';

@Component({
	selector: 'app-groups',
	standalone: true,
	imports: [
		TabsContainer
	],
	templateUrl: './groups.component.html',
	styleUrl: './groups.component.scss'
})
export class GroupsComponent {
	tabs: TabConfig[] = [];

	constructor() {
		const groups = getGroups();
		this.tabs = groups.map(group => ({
			label: group.label,
			route: `/chat/groups/${group.id}`
		}));
	}
}
