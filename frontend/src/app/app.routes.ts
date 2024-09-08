import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GlobalTabsComponent } from './global-tabs/global-tabs.component';
import { LogoutScreen } from './logout-screen/logout-screen.component';
import { ChatWindow } from './chat-window/chat-window.component';
import { LoginScreen } from './login-screen/login-screen.component';
import { ChatScreen } from './chat-screen/chat-screen.component';
import { ChatScreenProvider } from './chat-screen/chat-screen.provider';
import { AuthGuard } from './auth.guard';
import { SignupScreen } from './signup-screen/signup-screen.component';

export const routes: Routes = [
	{
		path: 'login',
		component: LoginScreen,
		data: { animation: 'LoginScreen' }
	},
	{
		path: 'register',
		component: SignupScreen,
		data: { animation: 'SignupScreen' }
	},
	{
		path: 'chat',
		component: GlobalTabsComponent,
		children: [
			{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
			{
				path: 'groups',
				component: ChatScreen,
				canActivate: [AuthGuard],
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
				canActivate: [AuthGuard],
				data: { title: 'Channel chat' },
				resolve: { items: ChatScreenProvider },
				children: [
					{ path: ':channelId', component: ChatWindow },
					{ path: '', component: ChatWindow }, // Where to land when no chat is selected
				],
			},
			{ path: 'logout', component: LogoutScreen, canActivate: [AuthGuard] },
			{ path: '', redirectTo: 'home', pathMatch: 'full' }, // Default tab
		],
	},
	{ path: '**', redirectTo: 'login' }, // Fallback route
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
