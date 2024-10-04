import { ExpandableComponent } from './expandable.component';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { waitForCssTransition } from '../../../test.utils';
import { axe } from 'jasmine-axe';

describe('ExpandableComponent', () => {
	let component: Element;

	beforeEach(async () => {
		const { fixture } = await render(`
            <app-expandable label="Expand" direction="down">
                <p>Content</p>
            </app-expandable>
        `, { imports: [ExpandableComponent] }
		);

		component = fixture.nativeElement;
	});

	it('should be accessible', async () => {
		expect(await axe(component)).toHaveNoViolations();
	});

	it('renders with correct button label', async () => {
		expect(screen.getByRole('button', { name: 'Expand' })).toBeVisible();
	});

	it('does not initially show the content', async () => {
		expect(screen.queryByText('Content')).not.toBeVisible();
	});

	it('expands and shows the content on click', async() => {
		const button = screen.getByRole('button', { name: 'Expand' });
		const content = screen.getByTestId('expandable-content');

		fireEvent.click(button);
		await waitForCssTransition(content);

		expect(screen.getByText('Content')).toBeVisible();
	});
});
