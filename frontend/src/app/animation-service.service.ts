import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class RouteAnimationService {
	constructor(private router: Router) {}

	// Method to listen for route changes and return animation state
	getRouteAnimationState(route: ActivatedRoute): Observable<string | null> {
		return this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			map(() => this.getDeepestChildRoute(route)),
			map(route => this.prepareRouteForAnimation(route)),
			filter(animationState => !!animationState), // Ignore null, undefined, or falsy values
			distinctUntilChanged() // Ignore subsequent calls with the same animation state
		);
	}

	// Find the deepest child route
	getDeepestChildRoute(route: ActivatedRoute): ActivatedRoute {
		let deepestRoute = route;
		while (deepestRoute.firstChild) {
			if (deepestRoute.component && deepestRoute.component.name !== 'GlobalTabsComponent') {
				deepestRoute = deepestRoute.firstChild;
			}
		}

		return deepestRoute;
	}

	// Get the nearest parent with animation or return null if not found
	getNearestParentWithAnimation(route: ActivatedRoute): ActivatedRoute | null {
		let currentRoute = route;
		while (!currentRoute.snapshot.data['animation'] && currentRoute.parent) {
			currentRoute = currentRoute.parent;
		}

		return currentRoute.snapshot.data['animation'] ? currentRoute : null;
	}

	// Prepare route animation based on the current or parent route
	prepareRouteForAnimation(route: ActivatedRoute): string | null {
		let animationName = route.snapshot?.data?.['animation'] ?? this.getNearestParentWithAnimation(route)?.snapshot?.data?.['animation'];
		const animationState = animationName === 'GlobalTabs' ? null : animationName;

		return animationState;
	}
}
