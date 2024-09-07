import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsContainer } from './tabs-container/tabs-container.component';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';

export const routes: Routes = [
	{
		path: 'chat',
		component: TabsContainer,
		children: [
			{ path: 'home', component: HomeComponent },
			{ path: 'groups', component: GroupsComponent },
			{ path: 'channels', component: ChannelsComponent },
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
