import { Component, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { TabConfig } from '../types';
import { NgForOf, NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
	selector: 'app-tabs-container',
	templateUrl: './tabs-container.component.html',
	styleUrls: ['./tabs-container.component.scss'],
	imports: [
		RouterOutlet,
		TooltipComponent,
		IconButtonComponent,
		NgForOf,
		NgIf,
		ButtonComponent
	],
	standalone: true
})
export class TabsContainer {
	@Input() tabs: TabConfig[] = [];

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
