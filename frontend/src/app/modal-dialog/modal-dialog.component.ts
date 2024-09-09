import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-modal-dialog',
	standalone: true,
	imports: [
		NgIf,
		IconButtonComponent
	],
	templateUrl: './modal-dialog.component.html',
	styleUrl: './modal-dialog.component.scss',
	animations: [
		trigger('dialogOverlay', [
			state('open', style({
				opacity: 1,
				visibility: 'visible'
			})),
			state('closed', style({
				opacity: 0,
				visibility: 'hidden',
				'z-index': -1
			})),
			transition('open => closed', [
				animate('0.2s ease-in')
			]),
			transition('closed => open', [
				animate('0.2s ease-out')
			])
		]),
		trigger('dialogContent', [
			state('open', style({
				transform: 'translateY(-200px)',
				opacity: 1,
				visibility: 'visible'
			})),
			state('closed', style({
				transform: 'translateY(0)',
				opacity: 0,
				visibility: 'hidden',
				'z-index': -1
			})),
			transition('open => closed', [
				animate('0.2s ease-in')
			]),
			transition('closed => open', [
				animate('0.2s ease-out')
			])
		])
	]
})
export class ModalDialog {
	@Input() title: string = '';
	@Input() triggerLabel: string = 'Open';
	@Input() triggerIcon: string = '';
	show: boolean = false;
	inDOM: boolean = false;

	open() {
		this.inDOM = true;
		setTimeout(() => {
			this.show = true;
		}, 100);
	}

	close() {
		this.show = false;
		setTimeout(() => {
			this.inDOM = false;
		}, 300);
	}
}
