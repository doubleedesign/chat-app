import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { GlobalTabsComponent } from './global-tabs/global-tabs.component';
import { LogoutScreen } from './logout-screen/logout-screen.component';
import { ChatWindow } from './chat-window/chat-window.component';
import { LoginScreen } from './login-screen/login-screen.component';

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
			{ path: 'groups', component: GroupsComponent },
			{ path: 'channels', component: ChannelsComponent },
			{ path: 'logout', component: LogoutScreen },
			{
				path: 'groups',
				component: GroupsComponent,
				children: [{ path: ':groupId', component: ChatWindow }],
			},
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
