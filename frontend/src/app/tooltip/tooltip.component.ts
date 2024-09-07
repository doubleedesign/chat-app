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
	showTooltip = false;

	show() {
		this.showTooltip = true;
	}

	hide() {
		this.showTooltip = false;
	}
}
