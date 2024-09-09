import { Component } from '@angular/core';
import { ModalDialog } from '../modal-dialog/modal-dialog.component';

@Component({
	selector: 'app-add-channel',
	standalone: true,
	imports: [
		ModalDialog
	],
	templateUrl: './add-channel.component.html',
	styleUrl: './add-channel.component.scss'
})
export class AddChannelComponent {

}
