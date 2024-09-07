import { Component, Input } from '@angular/core';
import { AlertStyle } from '../types';

@Component({
	selector: 'app-message-box',
	standalone: true,
	imports: [],
	templateUrl: './message-box.component.html',
	styleUrl: './message-box.component.scss'
})
export class MessageBoxComponent {
	@Input() style: AlertStyle = 'info';
	@Input() heading: string = '';
}
