import { Component, Input } from '@angular/core';
import { TabsContainer } from '../tabs-container/tabs-container.component';
import { TabConfig } from '../types';
import { NgIf } from '@angular/common';

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
export class ChatListComponent {
	@Input() tabs: TabConfig[] = [];
	@Input() location: 'sidebar' | 'window' = 'sidebar';
}
