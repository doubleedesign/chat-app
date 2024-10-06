import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { ModalDialog } from './modal-dialog.component';
import { waitForScreenChange } from '../../../test.utils';
import { axe } from 'jasmine-axe';

describe('ModalDialogComponent', () => {
	let component: Element;

	describe('closed state', () => {
		beforeEach(async () => {
			const { fixture } = await render(
				`<app-modal-dialog triggerLabel="Add group" title="Add group" triggerIcon="fa-solid fa-plus">
                    <p>Modal content</p>
                </app-modal-dialog>`,
				{ imports: [ModalDialog] }
			);

			component = fixture.nativeElement;
		});

		it('renders the trigger button', () => {
			expect(screen.getByRole('button', { name: 'Add group' })).toBeVisible();
		});

		it('initially renders without the dialog visible', () => {
			expect(screen.queryByText('Modal content')).toBeNull();
		});

		it('opens the dialog when the trigger button is clicked', async () => {
			const button = screen.getByRole('button', { name: 'Add group' });

			fireEvent.click(button);
			await waitForScreenChange();

			expect(screen.getByRole('dialog')).toBeVisible();
		});
	});

	describe('open state', () => {
		beforeEach(async () => {
			const { fixture } = await render(
				`<app-modal-dialog [show]="true" triggerLabel="Add group" title="Add group" triggerIcon="fa-solid fa-plus">
                    <p>Modal content</p>
                </app-modal-dialog>`,
				{ imports: [ModalDialog] }
			);

			component = fixture.nativeElement;
		});

		it('is accessible', async () => {
			expect(await axe(component)).toHaveNoViolations();
		});

		it('renders with a close button when open', async () => {
			expect(screen.getByRole('button', { name: 'Close dialog' })).toBeVisible();
		});

		it('closes the dialog when the close button is clicked', async () => {
			const closeButton = screen.getByRole('button', { name: 'Close dialog' });

			fireEvent.click(closeButton);
			await waitForScreenChange();

			expect(screen.queryByText('Modal content')).not.toBeVisible();
		});
	});
});
