import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
	selector: 'app-tabs-container',
	templateUrl: './tabs-container.component.html',
	styleUrls: ['./tabs-container.component.scss'],
	imports: [
		RouterOutlet,
		TooltipComponent,
		IconButtonComponent
	],
	standalone: true
})
export class TabsContainer {
	constructor(private router: Router) {}

	selectTab(path: string) {
		this.router.navigate([path]);
	}

	isActive(route: string): boolean {
		return this.router.url === route;
	}

	logout() {
		alert('Not implemented yet');
	}
}
