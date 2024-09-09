import { Component } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { NgIf } from '@angular/common';
import { PageContentComponent } from '../page-content/page-content.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-channel-messages',
	standalone: true,
	imports: [
		IconButtonComponent,
		MessageBoxComponent,
		NgIf,
		PageContentComponent
	],
	templateUrl: './channel-messages.component.html',
	styleUrls: ['./channel-messages.component.scss']
})
export class ChannelMessagesComponent {
	channelId: string = '';

	constructor(private route: ActivatedRoute, private router: Router) {
		// Traverse up to the parent route to find the channelId
		this.route.parent?.params.subscribe(params => {
			this.channelId = params['channelId'];
		});
	}

	goToChannelSettings() {
		if (this.channelId) {
			this.router.navigate([`chat/channels/${this.channelId}/settings`]);
		}
		else {
			console.error('Cannot navigate to channel settings without a channel ID');
		}
	}
}
