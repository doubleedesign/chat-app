import { Component } from '@angular/core';
import { TabsContainer } from '../tabs-container/tabs-container.component';
import { Router } from '@angular/router';
import { TabConfig } from '../types';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
	selector: 'app-global-tabs',
	standalone: true,
	imports: [TabsContainer, IconButtonComponent],
	templateUrl: './global-tabs.component.html',
	styleUrl: './global-tabs.component.scss'
})
export class GlobalTabsComponent {
	constructor(private router: Router) {}

	tabs: TabConfig[] = [
		{
			label: 'Home',
			route: '/chat/home',
			icon: 'fa-solid fa-house-chimney'
		},
		{
			label: 'Groups',
			route: '/chat/groups',
			icon: 'fa-solid fa-people-group'
		},
		{
			label: 'Channels',
			route: '/chat/channels',
			icon: 'fa-solid fa-code-merge'
		},
		{
			label: 'Log out',
			route: '/chat/logout',
			icon: 'fa-solid fa-left-from-bracket',
		}
	];
}
