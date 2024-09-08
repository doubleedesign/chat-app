import { Component, Input, OnInit } from '@angular/core';
import { TabsContainer } from '../tabs-container/tabs-container.component';
import { TabConfig } from '../types';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-chat-list',
	standalone: true,
	imports: [
		TabsContainer,
		NgIf
	],
	templateUrl: './chat-list.component.html',
	styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit {
	@Input() tabs: TabConfig[] = [];
	@Input() location: 'sidebar' | 'window' = 'sidebar';
	showBackButton: boolean = false;

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.router.events.subscribe(() => {
			const currentRoute = this.router.url;
			// Check if the current route starts with 'groups' or 'channels'
			console.log(currentRoute);
			this.showBackButton = currentRoute.startsWith('/chat/groups') || currentRoute.startsWith('/chat/channels');
		});
	}
}
