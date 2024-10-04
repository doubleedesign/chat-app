import { ExpandableComponent } from './expandable.component';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { waitForCssTransition } from '../../../test.utils';

describe('ExpandableComponent', () => {
	beforeEach(async () => {
		await render(`
            <app-expandable label="Expand" direction="down">
                <p>Content</p>
            </app-expandable>
        `, { imports: [ExpandableComponent] }
		);
	});

	it('should render with correct button label', async () => {
		expect(screen.getByRole('button', { name: 'Expand' })).toBeVisible();
	});

	it('should not initially show the content', async () => {
		expect(screen.queryByText('Content')).not.toBeVisible();
	});

	it('should expand and show the content on click', async() => {
		const button = screen.getByRole('button', { name: 'Expand' });
		const content = screen.getByTestId('expandable-content');

		fireEvent.click(button);
		await waitForCssTransition(content);

		expect(screen.getByText('Content')).toBeVisible();
	});
});
