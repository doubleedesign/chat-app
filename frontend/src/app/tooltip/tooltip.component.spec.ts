import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TooltipComponent } from './tooltip.component';
import { axe } from 'jasmine-axe';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';

/**
 * Notes:
 * Using Angular's fakefakeAsync(, tick, and fixture.detectChanges are needed in these tests so that:
 * - the class name changes that occur after a time delay (which handle visibility) are picked up
 * - all changes in multistep interactions are handled
 * When using my simple wait utilities, the above don't work as expected.
 * I have implemented this approach in all tests in this file for consistency, rather than mixing the two.
 */
describe('TooltipComponent', () => {
	let component: Element;
	let componentFixture: ComponentFixture<unknown>;

	beforeEach(async () => {
		const { fixture } = await render(
			`<app-tooltip text="Test tooltip">
                <button>Groups</button>
            </app-tooltip>
            <a href="#">Something to move focus to</a>`,
			{ imports: [TooltipComponent] }
		);

		component = fixture.nativeElement;
		componentFixture = fixture;
	});

	it('is accessible when tooltip is not shown', async() => {
		expect(await axe(component)).toHaveNoViolations();
	});

	it('is accessible when tooltip is shown', async() => {
		const element = screen.getByTestId('tooltipped-element');
		await userEvent.hover(element);

		expect(screen.getByRole('tooltip')).toBeInTheDocument();
		expect(await axe(component)).toHaveNoViolations();
	});

	it('initially renders without the tooltip content', () => {
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
		expect(screen.queryByText('Test tooltip')).toBeNull();
	});

	it('renders the tooltip on mouse enter', fakeAsync( () => {
		const element = screen.getByTestId('tooltipped-element');

		userEvent.hover(element);
		tick(200);
		componentFixture.detectChanges();
        
		const tooltip = screen.getByRole('tooltip', { name: 'Test tooltip' });
		expect(tooltip).toBeVisible();
	}));

	it('renders the tooltip when an element inside receives keyboard focus', fakeAsync( () => {
		const button = screen.getByRole('button', { name: 'Groups' });

		userEvent.tab();
		tick(200);
		componentFixture.detectChanges();

		expect(button).toHaveFocus();
		expect(screen.getByRole('tooltip')).toBeInTheDocument();
	}));

	it('removes the tooltip on mouse leave', fakeAsync((() => {
		const element = screen.getByTestId('tooltipped-element');

		userEvent.hover(element);
		tick(200);
		componentFixture.detectChanges();
		expect(screen.getByRole('tooltip')).toBeVisible();

		userEvent.unhover(element);
		tick(700);
		componentFixture.detectChanges();
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
	})));

	it('removes the tooltip when the element inside loses keyboard focus', fakeAsync(( () => {
		const button = screen.getByRole('button', { name: 'Groups' });

		userEvent.tab();
		tick(200);
		componentFixture.detectChanges();

		expect(button).toHaveFocus();
		expect(screen.getByRole('tooltip')).toBeInTheDocument();

		userEvent.tab();
		tick(600);
		componentFixture.detectChanges();
		expect(button).not.toHaveFocus();
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
	})));
});
