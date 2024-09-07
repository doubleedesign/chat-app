import { Component } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { PageContentComponent } from '../page-content/page-content.component';

@Component({
	selector: 'app-login-screen',
	standalone: true,
	imports: [
		MessageBoxComponent,
		PageContentComponent
	],
	templateUrl: './login-screen.component.html',
	styleUrl: './login-screen.component.scss'
})
export class LoginScreen {

}
