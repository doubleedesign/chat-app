import { Component } from '@angular/core';
import { PageContentComponent } from '../page-content/page-content.component';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Inflectors } from 'en-inflectors';

@Component({
	selector: 'app-chat-window',
	standalone: true,
	imports: [
		PageContentComponent,
		MessageBoxComponent,
		NgIf
	],
	templateUrl: './chat-window.component.html',
	styleUrl: './chat-window.component.scss'
})
export class ChatWindow {
	title: string = '';
	type: string = '';
	selected: string | undefined;

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
}
