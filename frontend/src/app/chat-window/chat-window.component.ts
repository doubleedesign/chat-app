import { Component } from '@angular/core';
import { PageContentComponent } from '../page-content/page-content.component';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
	selector: 'app-chat-window',
	standalone: true,
	imports: [
		PageContentComponent,
		MessageBoxComponent
	],
	templateUrl: './chat-window.component.html',
	styleUrl: './chat-window.component.scss'
})
export class ChatWindow {

}
