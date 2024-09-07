import { Component } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { PageContentComponent } from '../page-content/page-content.component';

@Component({
	selector: 'app-logout-screen',
	standalone: true,
	imports: [
		MessageBoxComponent,
		PageContentComponent
	],
	templateUrl: './logout-screen.component.html',
	styleUrl: './logout-screen.component.scss'
})
export class LogoutScreen {

}
