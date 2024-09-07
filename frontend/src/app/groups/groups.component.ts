import { Component } from '@angular/core';
import { Group, TabConfig } from '../types';
import { TabsContainer } from '../tabs-container/tabs-container.component';
import { getGroups } from '../data';
import { ChatListComponent } from '../chat-list/chat-list.component';

@Component({
	selector: 'app-groups',
	standalone: true,
	imports: [
		TabsContainer,
		ChatListComponent
	],
	templateUrl: './groups.component.html',
	styleUrl: './groups.component.scss'
})
export class GroupsComponent {
	tabs: TabConfig[] = [];

	constructor() {
		const groups: Group[] = getGroups();
		this.tabs = groups.map(group => ({
			label: group.label,
			route: `/chat/groups/${group.id}`,
			icon: group?.avatar
		}));
	}
}
