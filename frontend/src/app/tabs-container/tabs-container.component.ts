import { Component, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { TabConfig } from '../types';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { BackButtonComponent } from '../back-button/back-button.component';
import { transition, trigger } from '@angular/animations';
import { animations } from '../animations';
import { RouteAnimationService } from '../animation-service.service';

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
		NgTemplateOutlet,
		BackButtonComponent
	],
	standalone: true,
	animations: [
		trigger('routeAnimations', [
			transition('ChannelMessages <=> ChatWindow', animations.crossFade()),
			transition('ChatWindow-Group <=> ChannelMessages', animations.crossFade()),
			transition('ChatWindow-Group <=> ChatWindow-Empty', animations.crossFade()),
			transition('ChannelSettings <=> ChatWindow-Empty', animations.crossFade()),
		])
	]
})
export class TabsContainer {
	@Input() tabs: TabConfig[] = [];
	@Input() buttonTemplate: TemplateRef<any> | null = null; // Accept a template from the parent
	@Input() theme: 'light' | 'dark' = 'dark';
	@Input() size: 'narrow' | 'wide' | 'fullwidth' = 'wide';
	@Input() showBackButton: boolean = false;
	activeRouteAnimation: string | null = null;

	constructor(private router: Router, private route: ActivatedRoute, private routeAnimationService: RouteAnimationService) {
		// Use the service to subscribe to route animation state changes
		this.routeAnimationService.getRouteAnimationState(this.route).subscribe(animationState => {
			console.log('animationState in tabs container', animationState);
			this.activeRouteAnimation = animationState;
		});
	}

	selectTab(path: string) {
		this.router.navigate([path]);
	}

	isActive(route: string): boolean {
		return this.router.url === route || this.router.url.startsWith(route);
	}
}
