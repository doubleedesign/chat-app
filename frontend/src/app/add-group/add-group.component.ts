import { Component } from '@angular/core';
import { ModalDialog } from '../modal-dialog/modal-dialog.component';

@Component({
	selector: 'app-add-group',
	standalone: true,
	imports: [
		ModalDialog
	],
	templateUrl: './add-group.component.html',
	styleUrl: './add-group.component.scss'
})
export class AddGroupComponent {

}
