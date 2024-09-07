import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	standalone: true,
	imports: [],
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss'
})
export class ButtonComponent {
	@Input() label: string = '';
	@Input() classNames: string = '';
	@Input() active: boolean = false;
	@Output() buttonClick = new EventEmitter<void>();

	onClick() {
		this.buttonClick.emit();
	}
}
