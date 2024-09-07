import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsContainer } from './tabs-container/tabs-container.component';
import { ExpandableComponent } from './expandable/expandable.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, TabsContainer, ExpandableComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'chat-app';
}
