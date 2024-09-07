import { Component, Input } from '@angular/core';
import { TabsContainer } from '../tabs-container/tabs-container.component';
import { TabConfig } from '../types';

@Component({
	selector: 'app-chat-list', 
	standalone: true,
	imports: [
		TabsContainer
	],
	templateUrl: './chat-list.component.html',
	styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {
	@Input() tabs: TabConfig[] = [];
}
