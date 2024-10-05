import { of } from 'rxjs';

/**
 * Utility function to wait for an element's CSS transition to end before asserting
 * @param element - The HTML element with the transition we need to wait for
 */
export async function waitForCssTransition(element: HTMLElement): Promise<void> {
	return new Promise<void>((resolve) => {
		element.addEventListener('transitionend', () => {
			resolve();
		});
	});
}

/**
 * Utility function to wait for enough time for the route change  to complete (because many of them are animated)
 * or another interaction such as an open/closed state transition
 */
export async function waitForScreenChange(): Promise<void> {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, 200);
	});
}

/**
 * Mock implementation of the AuthGuard service to mock logged-in state
 */
export class MockAuthGuard {
	canActivate() {
		return true;
	}
}
