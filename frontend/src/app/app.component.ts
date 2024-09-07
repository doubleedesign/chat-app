import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsContainer } from './tabs-container/tabs-container.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, TabsContainer],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'chat-app';
}
