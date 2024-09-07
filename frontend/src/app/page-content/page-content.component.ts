import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-page-content',
	standalone: true,
	imports: [],
	templateUrl: './page-content.component.html',
	styleUrl: './page-content.component.scss'
})
export class PageContentComponent {
	@Input() title: string = '';
}
