import { Component } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { PageContentComponent } from '../page-content/page-content.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		MessageBoxComponent,
		PageContentComponent
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {

}
