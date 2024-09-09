import { Component, OnInit } from '@angular/core';
import { PageContentComponent } from '../page-content/page-content.component';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Inflectors } from 'en-inflectors';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { TabConfig } from '../types';
import { getChannels } from '../data';
import { from } from 'rxjs';
import { AddGroupComponent } from '../add-group/add-group.component';
import { AddChannelComponent } from '../add-channel/add-channel.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { RouteAnimationService } from '../animation-service.service';
import { transition, trigger } from '@angular/animations';
import { animations } from '../animations';

@Component({
	selector: 'app-chat-window',
	standalone: true,
	imports: [
		PageContentComponent,
		MessageBoxComponent,
		NgIf,
		ChatListComponent,
		AddGroupComponent,
		AddChannelComponent,
		IconButtonComponent,
		RouterOutlet
	],
	templateUrl: './chat-window.component.html',
	styleUrl: './chat-window.component.scss',
	animations: [
		trigger('routeAnimations', [
			transition('ChannelMessages <=> ChannelSettings', animations.crossFade()),
			transition('ChatWindow-Empty <=> ChannelMessages', animations.crossFade()),
			transition('ChatWindow-Group <=> ChannelMessages', animations.crossFade()),
			transition('ChatWindow-Empty <=> ChatWindow-Group', animations.crossFade()),
			transition('ChannelSettings <=> ChatWindow-Group', animations.crossFade()),
		])
	]
})
export class ChatWindow implements OnInit {
	title: string = '';
	type: string = '';
	selected: string | undefined;
	subTabs: TabConfig[] = [];
	containerId: string = '';
	activeRouteAnimation: string | null = null;

	constructor(private router: Router, private route: ActivatedRoute, private routeAnimationService: RouteAnimationService) {
		// Use the service to subscribe to route animation state changes
		this.routeAnimationService.getRouteAnimationState(this.route).subscribe(animationState => {
			console.log('animationState in chat window', animationState);
			this.activeRouteAnimation = animationState;
		});

		const parentPath = route?.parent?.snapshot?.routeConfig?.path;
		if(parentPath) {
			this.type = new Inflectors(parentPath).toSingular();
		}
		const parentTitle = route?.parent?.snapshot?.data?.['title'];
		if(parentTitle) {
			this.title = parentTitle;
		}

		this.containerId = route?.snapshot?.params?.['groupId'] || route?.snapshot?.params?.['channelId'] || '';

		this.selected = route?.snapshot?.params?.['groupId'] || route?.snapshot?.params?.['channelId'] || undefined;
	}

	ngOnInit() {
		if(this.type === 'group' && this.selected) {
			from(getChannels(this.selected)).subscribe(channels => {
				this.subTabs = channels.map(channel => ({
					label: channel.label,
					route: `/chat/channels/${channel.id}/messages`
				}));
			});
		}
	}
}
