import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TabsContainer } from './tabs-container/tabs-container.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { trigger, transition } from '@angular/animations';
import { animations } from './animations';
import { RouteAnimationService } from './animation-service.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, TabsContainer, ExpandableComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('routeAnimations', [
			transition('LoginScreen <=> SignupScreen', animations.swapDown()),
		])
	]
})
export class AppComponent {
	title = 'chat-app';
	activeRouteAnimation: string | null = null;

	constructor(private route: ActivatedRoute, private routeAnimationService: RouteAnimationService) {
		// Use the service to subscribe to route animation state changes
		this.routeAnimationService.getRouteAnimationState(this.route).subscribe(animationState => {
			this.activeRouteAnimation = animationState;
		});
	}
}
