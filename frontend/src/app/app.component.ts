import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsContainer } from './tabs-container/tabs-container.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { trigger, transition, query, group, animate, style } from '@angular/animations';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, TabsContainer, ExpandableComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('routeAnimations', [
			transition('LoginScreen <=> SignupScreen', [
				style({ opacity: 0 }),
				animate('0.5s', style({ opacity: 1 }))
			])
		])
	]
})
export class AppComponent {
	title = 'chat-app';

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
	}
}
