import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-tooltip',
	standalone: true,
	imports: [
		NgIf
	],
	templateUrl: './tooltip.component.html',
	styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
	@Input() text: string = '';
	@Input() position: string = 'bottom';
	visible = false;
	transitionClasses = '';

	show() {
		this.visible = true;
		setTimeout(() => {
			this.transitionClasses = 'visible';
		}, 200);
	}

	hide() {
		setTimeout(() => {
			this.transitionClasses = '';
			setTimeout(() => {
				this.visible = false;
			}, 300);
		}, 300);
	}
}
