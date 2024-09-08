import { Component } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { PageContentComponent } from '../page-content/page-content.component';
import { Router } from '@angular/router';

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

	constructor(private router: Router) {}

	onLogout() {
		// TODO: Implement proper logout logic
		// The timeout adds a very brief pause to simulate a network request
		setTimeout(() => {
			localStorage.removeItem('chatty-user');
			this.router.navigate(['/login']);
		}, 200);
	}
}
