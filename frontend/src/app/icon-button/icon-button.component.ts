import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
	selector: 'app-icon-button',
	standalone: true,
	templateUrl: './icon-button.component.html',
	imports: [
		TooltipComponent
	],
	styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
	@Input() iconClass: string = '';
	@Input() tooltip: string = '';
	@Input() active: boolean = false;
	@Output() buttonClick = new EventEmitter<void>();

	onClick() {
		this.buttonClick.emit();
	}
}
