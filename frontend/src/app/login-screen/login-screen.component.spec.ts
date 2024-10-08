import { LoginScreen } from './login-screen.component';
import { fireEvent, render, screen } from '@testing-library/angular';
import { axe } from 'jasmine-axe';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app.routes';
import { waitForScreenChange } from '../../../test.utils';

describe('LoginScreenComponent', () => {
	let component: Element;
	let router: Router;

	beforeEach(async () =>  {
		const { fixture } = await render(
			'<app-login-screen></app-login-screen>',
			{ imports: [LoginScreen, RouterTestingModule.withRoutes(routes)] }
		);

		router = TestBed.inject(Router);
		component = fixture.nativeElement;
	});

	it('should be accessible', async () => {
		expect(await axe(component)).toHaveNoViolations();
	});

	it('shows the correct error message if the email field is left blank', () => {
		const button = screen.getByRole('button', { name: 'Let\'s chat' });
		fireEvent.click(button);

		expect(screen.getByText('Email is required')).toBeVisible();
	});

	it('shows the correct error message if an invalid email format is entered', () => {
		const button = screen.getByRole('button', { name: 'Let\'s chat' });
		const input = screen.getByRole('textbox', { name: 'Email' });
		fireEvent.input(input, { target: { value: 'notanemail' } });
		fireEvent.click(button);
        
		expect(screen.getByText('Invalid email format')).toBeVisible();
	});

	it('shows the correct error message if the password field is left blank', () => {
		const button = screen.getByRole('button', { name: 'Let\'s chat' });
		fireEvent.click(button);

		expect(screen.getByText('Password is required')).toBeVisible();
	});

	it('switches to the registration form when the link is clicked', async () => {
		const link = screen.getByRole('link', { name: /Register now/ });

		fireEvent.click(link);
		await waitForScreenChange();

		expect(router.url).toBe('/register');
	});

	it('redirects to the home screen when login is successful', async () => {
		const email = screen.getByRole('textbox', { name: 'Email' });
		const password = screen.getByLabelText('Password');
		const button = screen.getByRole('button', { name: 'Let\'s chat' });

		fireEvent.input(email, { target: { value: 'leesa.ward@griffithuni.edu.au' } });
		fireEvent.input(password, { target: { value: 'test-password' } });
		fireEvent.click(button);
		await waitForScreenChange();

		expect(router.url).toBe('/chat/home');
	});

	it('saves login status to local storage when login is successful', async () => {
		const localStorageSpy = spyOn(localStorage, 'setItem');
		const email = screen.getByRole('textbox', { name: 'Email' });
		const password = screen.getByLabelText('Password');
		const button = screen.getByRole('button', { name: 'Let\'s chat' });

		fireEvent.input(email, { target: { value: 'leesa.ward@griffithuni.edu.au' } });
		fireEvent.input(password, { target: { value: 'test-password' } });
		fireEvent.click(button);
		await waitForScreenChange();

		expect(localStorageSpy).toHaveBeenCalledWith('chatty-user', JSON.stringify('leesa.ward@griffithuni.edu.au'));
	});
});
