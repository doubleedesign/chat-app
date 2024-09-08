import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GlobalTabsComponent } from './global-tabs/global-tabs.component';
import { LogoutScreen } from './logout-screen/logout-screen.component';
import { ChatWindow } from './chat-window/chat-window.component';
import { LoginScreen } from './login-screen/login-screen.component';
import { ChatScreen } from './chat-screen/chat-screen.component';
import { ChatScreenProvider } from './chat-screen/chat-screen.provider';

export const routes: Routes = [
	{
		path: 'login',
		component: LoginScreen
	},
	{
		path: 'chat',
		component: GlobalTabsComponent,
		children: [
			{ path: 'home', component: HomeComponent },
			{
				path: 'groups',
				component: ChatScreen,
				data: { title: 'Group chat' },
				resolve: { items: ChatScreenProvider },
				children: [
					{ path: ':groupId', component: ChatWindow },
					{ path: '', component: ChatWindow }, // Where to land when no chat is selected
				],
			},
			{
				path: 'channels',
				component: ChatScreen,
				data: { title: 'Channel chat' },
				resolve: { items: ChatScreenProvider },
				children: [
					{ path: ':channelId', component: ChatWindow },
					{ path: '', component: ChatWindow }, // Where to land when no chat is selected
				],
			},
			{ path: 'logout', component: LogoutScreen },
			{ path: '', redirectTo: 'home', pathMatch: 'full' }, // Default tab
		],
	},
	{ path: '**', redirectTo: 'login' }, // Fallback route
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
