import { Component, Input, TemplateRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { TabConfig } from '../types';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
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
		ButtonComponent,
		NgTemplateOutlet
	],
	standalone: true
})
export class TabsContainer {
	@Input() tabs: TabConfig[] = [];
	@Input() buttonTemplate: TemplateRef<any> | null = null; // Accept a template from the parent
	@Input() theme: 'light' | 'dark' = 'dark';
	@Input() size: 'narrow' | 'wide' = 'wide';

	constructor(private router: Router) {}

	selectTab(path: string) {
		this.router.navigate([path]);
	}

	isActive(route: string): boolean {
		return this.router.url === route || this.router.url.startsWith(route);
	}

	logout() {
		alert('Not implemented yet');
	}
}
