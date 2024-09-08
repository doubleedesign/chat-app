import { Component, OnInit } from '@angular/core';
import { PageContentComponent } from '../page-content/page-content.component';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Inflectors } from 'en-inflectors';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { TabConfig } from '../types';
import { getChannels } from '../data';
import { from } from 'rxjs';

@Component({
	selector: 'app-chat-window',
	standalone: true,
	imports: [
		PageContentComponent,
		MessageBoxComponent,
		NgIf,
		ChatListComponent
	],
	templateUrl: './chat-window.component.html',
	styleUrl: './chat-window.component.scss'
})
export class ChatWindow implements OnInit {
	title: string = '';
	type: string = '';
	selected: string | undefined;
	subTabs: TabConfig[] = [];

	constructor(route: ActivatedRoute) {
		const parentPath = route?.parent?.snapshot?.routeConfig?.path;
		if(parentPath) {
			this.type = new Inflectors(parentPath).toSingular();
		}
		const parentTitle = route?.parent?.snapshot?.data?.['title'];
		if(parentTitle) {
			this.title = parentTitle;
		}

		this.selected = route?.snapshot?.params?.['groupId'] || route?.snapshot?.params?.['channelId'] || undefined;
	}

	ngOnInit() {
		if(this.type === 'group' && this.selected) {
			from(getChannels(this.selected)).subscribe(channels => {
				this.subTabs = channels.map(channel => ({
					label: channel.label,
					route: `/chat/channels/${channel.id}`
				}));
			});
		}
	}
}
