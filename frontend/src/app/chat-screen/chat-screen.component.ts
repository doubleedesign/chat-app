import { Component, OnInit } from '@angular/core';
import { ChatContainer, TabConfig } from '../types';
import { TabsContainer } from '../tabs-container/tabs-container.component';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-groups',
	standalone: true,
	imports: [
		TabsContainer,
		ChatListComponent
	],
	templateUrl: './chat-screen.component.html',
	styleUrl: './chat-screen.component.scss'
})
export class ChatScreen implements OnInit {
	tabs: TabConfig[] = [];
	path: string = '';

	constructor(private route: ActivatedRoute) {
		this.path = route?.routeConfig?.path || '';
	}

	ngOnInit(): void {
		// Access the data passed via the route + provider
		this.route.data.subscribe((data) => {
			this.tabs = data['items'].map((item: ChatContainer) => ({
				label: item.label,
				route: this.path === 'channels' ? `/chat/${this.path}/${item.id}/messages` : `/chat/${this.path}/${item.id}`,
				icon: item?.avatar
			}));
		});
	}
}
