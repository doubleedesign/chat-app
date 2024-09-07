import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { GlobalTabsComponent } from './global-tabs/global-tabs.component';
import { LogoutScreen } from './logout-screen/logout-screen.component';

export const routes: Routes = [
	{
		path: 'chat',
		component: GlobalTabsComponent,
		children: [
			{ path: 'home', component: HomeComponent },
			{ path: 'groups', component: GroupsComponent },
			{ path: 'channels', component: ChannelsComponent },
			{ path: 'logout', component: LogoutScreen },
			{ path: '', redirectTo: 'home', pathMatch: 'full' }, // Default tab
		],
	},
	{ path: '**', redirectTo: 'home' }, // Fallback route
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
