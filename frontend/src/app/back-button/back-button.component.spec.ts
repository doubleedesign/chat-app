import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { BackButtonComponent } from './back-button.component';
import { axe } from 'jasmine-axe';
import { Location } from '@angular/common';

describe('BackButtonComponent', () => {
	let component: Element;
	let componentFixture: ComponentFixture<unknown>;
	let location: Location;

	beforeEach(async () => {
		const { fixture } = await render(
			'<app-back-button></app-back-button>',
			{ imports: [BackButtonComponent] }
		);

		location = TestBed.inject(Location);
		component = fixture.nativeElement;
		componentFixture = fixture;
	});

	it('is accessible', async () => {
		expect(await axe(component)).toHaveNoViolations();
	});

	it('navigates back when the button is clicked', () => {
		// Spy on the Location service's `back` method
		const locationSpy = spyOn(location, 'back').and.callThrough();

		const button = screen.getByRole('button', { name: 'Go back' });
		fireEvent.click(button);

		expect(locationSpy).toHaveBeenCalled();
	});
});
