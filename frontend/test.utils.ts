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