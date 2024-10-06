// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { fireEvent, render, screen } from '@testing-library/angular';
// import { ChatScreen } from './chat-screen.component';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { routes } from '../app.routes';
// import { APP_BASE_HREF } from '@angular/common';
// import { AuthGuard } from '../auth.guard';
// import { MockAuthGuard } from '../../../test.utils';
// import { ChatWindow } from '../chat-window/chat-window.component';
//
// const mockGroupRoutes = [
// 	{
// 		path: 'group-id-1',
// 		component: ChatWindow,
// 	},
// 	{
// 		path: 'group-id-2',
// 		component: ChatWindow,
// 	},
// 	{
// 		path: 'group-id-3',
// 		component: ChatWindow,
// 	}
// ];
//
// describe('ChatScreen', () => {
// 	let component: Element;
// 	let componentFixture: ComponentFixture<unknown>;
// 	let router: Router;
//
// 	beforeEach(async () => {
// 		const { fixture } = await render(
// 			'<app-groups></app-groups>',
// 			{
// 				imports: [ChatScreen, RouterTestingModule.withRoutes(
// 					routes.find(route => route.path === 'chat')?.children
// 						?.find(route => route.path === 'groups')?.children
//                     || []
// 				)],
// 				providers: [
// 					{ provide: APP_BASE_HREF, useValue: '/chat' },
// 					{ provide: AuthGuard, useClass: MockAuthGuard }
// 				]
// 			}
// 		);
//
// 		router = TestBed.inject(Router);
// 		component = fixture.nativeElement;
// 		componentFixture = fixture;
//
// 		router.initialNavigation();
// 		await componentFixture.whenStable();
// 	});
//
// 	// it('should load on the Groups screen', () => {
// 	// 	expect(router.url).toBe('/groups');
// 	// });
// 	//
// 	// it('should load tabs correctly based on route data', () => {
// 	// 	expect(screen.getByRole('button', { name: 'Group 1' })).toBeVisible();
// 	// });
//
// 	// it('should navigate to the correct route when a tab is clicked', () => {
// 	//
// 	// });
// });