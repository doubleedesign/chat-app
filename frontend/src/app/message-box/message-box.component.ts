import { Component, Input } from '@angular/core';
import { AlertStyle } from '../types';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-message-box',
	standalone: true,
	imports: [
		NgIf
	],
	templateUrl: './message-box.component.html',
	styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {
	@Input() style: AlertStyle = 'info';
	@Input() heading: string = '';
}
