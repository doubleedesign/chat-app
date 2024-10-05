import { GlobalTabsComponent } from './global-tabs.component';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app.routes';
import { MockAuthGuard } from '../../../test.utils';
import { AuthGuard } from '../auth.guard';
import { APP_BASE_HREF } from '@angular/common'; // to simulate Observable

describe('GlobalTabsComponent', () => {
	let component: Element;
	let componentFixture: ComponentFixture<any>;
	let router: Router;

	beforeEach(async () => {
		const { fixture } = await render(
			'<app-global-tabs></app-global-tabs>',
			{
				imports: [GlobalTabsComponent, RouterTestingModule.withRoutes(
					routes.find(route => route.path === 'chat')?.children || []
				)],
				providers: [
					{ provide: APP_BASE_HREF, useValue: '/chat' },
					{ provide: AuthGuard, useClass: MockAuthGuard }
				]
			}
		);

		router = TestBed.inject(Router);
		component = fixture.nativeElement;
		componentFixture = fixture;

		router.initialNavigation();
		await componentFixture.whenStable();
	});

	it('should load on the home screen by default', async () => {
		expect(router.url).toBe('/home');
	});

	it('should navigate on tab click', () => {
		// Mock the router's navigate method using Jasmine's spyOn
		const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

		const groupsButton = screen.getByRole('button', { name: 'Groups' });
		expect(groupsButton).toBeVisible();

		fireEvent.click(groupsButton);
		expect(navigateSpy).toHaveBeenCalledWith(['/chat/groups']);;
	});
});
