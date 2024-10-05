import { Router } from '@angular/router';
import { fireEvent, render, screen } from '@testing-library/angular';
import { LogoutScreen } from './logout-screen.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { routes } from '../app.routes';
import { waitForScreenChange } from '../../../test.utils';

describe('LogoutScreenComponent', () => {
	let component: Element;
	let router: Router;

	beforeEach(async () =>  {
		const { fixture } = await render(
			'<app-logout-screen></app-logout-screen>',
			{ imports: [LogoutScreen, RouterTestingModule.withRoutes(routes)] }
		);

		router = TestBed.inject(Router);
		component = fixture.nativeElement;
	});

	it('renders the confirmation prompt', () => {
		expect(screen.getByText('Are you sure you want to log out?')).toBeVisible();
	});

	it('redirects to login screen when the button is clicked', () => {
		const button = screen.getByRole('button', { name: 'Log out' });

		fireEvent.click(button);
		expect(router.url).toBe('/login');
	});

	it('clears login status from local storage', async () => {
		const localStorageSpy = spyOn(localStorage, 'removeItem');
		const button = screen.getByRole('button', { name: 'Log out' });

		fireEvent.click(button);
		await waitForScreenChange();

		expect(localStorageSpy).toHaveBeenCalledWith('chatty-user');
	});
});
