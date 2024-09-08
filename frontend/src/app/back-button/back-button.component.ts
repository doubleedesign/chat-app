import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
	selector: 'app-back-button',
	standalone: true,
	imports: [
		IconButtonComponent
	],
	templateUrl: './back-button.component.html',
	styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {
	tooltip: string = 'Go back'; // TODO: Ideally have a way of tracking where the user will go back to and display that in the tooltip

	constructor(private location: Location) { }

	goBack(): void {
		this.location.back();
	}
}
