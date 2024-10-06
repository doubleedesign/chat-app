import { ComponentFixture } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonComponent } from './button.component';
import { axe } from 'jasmine-axe';

describe('ButtonComponent', () => {
	let component: Element;
	let componentFixture: ComponentFixture<unknown>;
	let instance : ButtonComponent;

	beforeEach(async () => {
		// Need to render like this for the click handler and emitter tests
		// to work in a way that the coverage reporter understands
		const { fixture } = await render(ButtonComponent, {
			componentProperties: {
				label: 'Test button',
			},
		});

		component = fixture.nativeElement;
		componentFixture = fixture;
		instance = componentFixture.componentInstance as ButtonComponent;
	});

	it('is accessible', async () => {
		expect(await axe(component)).toHaveNoViolations();
	});

	it('renders with the correct label', () => {
		const button = screen.getByRole('button');
		expect(button).toHaveAccessibleName('Test button');
	});

	it('calls the click handler when clicked', () => {
		const buttonClickSpy = spyOn(instance, 'onClick').and.callThrough();
		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(buttonClickSpy).toHaveBeenCalled();
	});

	it('emits the buttonClick event when clicked', () => {
		const buttonClickSpy = spyOn(instance.buttonClick, 'emit');
		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(buttonClickSpy).toHaveBeenCalled();
	});
});