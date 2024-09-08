import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TabsContainer } from './tabs-container/tabs-container.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { trigger, transition } from '@angular/animations';
import { animations } from './animations';
import { distinctUntilChanged, filter, map } from 'rxjs';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, TabsContainer, ExpandableComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('routeAnimations', [
			transition('LoginScreen <=> SignupScreen', animations.swapDown()),
			transition('LoginScreen <=> GlobalTabs', animations.crossFade()),
			transition('SignupScreen => GlobalTabs', animations.crossFade()),
			transition(
				(fromState, toState) => {
					console.log(fromState, toState);

					return fromState?.startsWith('ChatWindow-') && toState?.startsWith('ChatWindow-');
				},
				animations.swapLeftToRight()
			)
		])
	]
})
export class AppComponent {
	title = 'chat-app';
	activeRouteAnimation: string = '';

	constructor(private router: Router, private route: ActivatedRoute) {
		// Listen for route changes and animate on parameter changes, ignoring subsequent identical animations
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(() => this.getDeepestChildRoute(this.route)),
				map(route => this.prepareRouteForAnimation(route)),
				distinctUntilChanged() // Ignore subsequent calls with the same animation state
			)
			.subscribe(animationState => {
				this.activeRouteAnimation = animationState;
			});
	}
	// Find the deepest child route
	getDeepestChildRoute(route: ActivatedRoute): ActivatedRoute {
		let currentRoute = route;
		while (currentRoute.firstChild) {
			currentRoute = currentRoute.firstChild;
		}

		return currentRoute;
	}

	// Get the nearest parent with animation or return null if not found
	getNearestParentWithAnimation(route: ActivatedRoute): ActivatedRoute | null {
		let currentRoute = route;
		while (!currentRoute.snapshot.data['animation'] && currentRoute.parent) {
			currentRoute = currentRoute.parent;
		}

		// Check if we found a parent with animation
		return currentRoute.snapshot.data['animation'] ? currentRoute : null;
	}

	// Prepare route animation based on the current or parent route
	prepareRouteForAnimation(route: ActivatedRoute): string {
		let animationName = route.snapshot?.data?.['animation'] ?? this.getNearestParentWithAnimation(route)?.snapshot?.data?.['animation'];

		// Append parameters to ensure uniqueness, allowing animation of routes using the same component
		const paramId = Object.entries(route.snapshot.params).find(([key, value]) => Number(value));

		if (paramId?.length === 2) {
			animationName = `${animationName}-${paramId[0]}-${paramId[1]}`;
		}

		console.log('Animation state:', animationName || 'none');

		return animationName || '';
	}

	prepareOutletForAnimation(outlet: RouterOutlet): string {
		if (outlet.isActivated) {
			return this.prepareRouteForAnimation(outlet.activatedRoute);
		}

		return '';
	}
}