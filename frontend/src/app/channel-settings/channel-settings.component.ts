import { Component } from '@angular/core';
import { PageContentComponent } from '../page-content/page-content.component';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { BackButtonComponent } from '../back-button/back-button.component';
import { NgIf } from '@angular/common';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-channel-settings',
	standalone: true,
	imports: [
		PageContentComponent,
		MessageBoxComponent,
		BackButtonComponent,
		NgIf,
		IconButtonComponent
	],
	templateUrl: './channel-settings.component.html',
	styleUrl: './channel-settings.component.scss'
})
export class ChannelSettingsComponent {
	channelId: string = '';

	constructor(private route: ActivatedRoute, private router: Router) {
		// Traverse up to the parent route to find the channelId
		this.route.parent?.params.subscribe(params => {
			this.channelId = params['channelId'];
		});
	}
	goToChannelMessages() {
		if (this.channelId) {
			this.router.navigate([`chat/channels/${this.channelId}/messages`]);
		}
		else {
			console.error('Cannot navigate to channel settings without a channel ID');
		}
	}
}
