import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { axe } from 'jasmine-axe';
import { ChatListComponent } from './chat-list.component';
import { TabConfig } from '../types';
import { within } from '@testing-library/dom';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteAnimationService } from '../animation-service.service';

describe('ChatListComponent', () => {
	let component: Element;
	let componentFixture: ComponentFixture<unknown>;
	let router: Router;

	const mockTabs: TabConfig[] = [
		{
			label: 'Group 1',
			route: 'group-1',
		},
		{
			label: 'Group 2',
			route: 'group-2',
		},
		{
			label: 'Group 3',
			route: 'group-3',
		}
	];
	const mockRoutes = [
		{
			path: 'chat/groups',
			data: {
				title: 'Group chat',
			},
			children: mockTabs.map(tab => ({
				path: tab.route,
				component: ChatListComponent,
				data: {
					title: tab.label,
				}
			}))
		}
	];
	const mockRouteAnimationService = {
		provide: RouteAnimationService,
		useValue: {
			getRouteAnimationState: () => ({ subscribe: () => ({}) })
		}
	};

	describe('Initial landing state', () => {
		beforeEach(fakeAsync(async () => {
			const { fixture } = await render(
				ChatListComponent, {
					componentProperties: { tabs: mockTabs },
					imports: [
						RouterTestingModule.withRoutes(mockRoutes)
					],
					providers: [
						{
							provide: ActivatedRoute,
							useValue: {
								parent: {
									snapshot: { url: [{ path: 'chat' }] }
								},
								snapshot: { url: [{ path: 'groups' }] }
							}
						},
						mockRouteAnimationService
					],
				}
			);

			router = TestBed.inject(Router);
			component = fixture.nativeElement;
			componentFixture = fixture;

			router.initialNavigation();
			await router.navigate(['/chat/groups']);
			tick();
			componentFixture.detectChanges();
			tick();
		}));

		it('is accessible', async () => {
			expect(await axe(component)).toHaveLessThanXViolations(3); // TODO: Fix document structure issues
		});

		it('does not render the back button', () => {
			expect(router.url).toBe('/chat/groups');
			console.log(router.url.startsWith('/chat/groups'));
			expect(screen.queryByRole('button', { name: 'Go back' })).toBeNull();
		});

		it('renders the list of chats as buttons', () => {
			const list = screen.getAllByRole('list')[0];
			const buttons = within(list).getAllByRole('button');
			expect(buttons.map(button => button.textContent)).toEqual(mockTabs.map(tab => tab.label));
		});

		it('navigates to the correct chat when a button is clicked', fakeAsync(() => {
			const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
			const button = screen.getByRole('button', { name: 'Group 2' });

			fireEvent.click(button);
			tick();

			expect(navigateSpy).toHaveBeenCalledWith(['group-2']);
		}));
	});

	describe('After navigating to nested route', () => {
		beforeEach(fakeAsync(async () => {
			const { fixture } = await render(
				ChatListComponent, {
					componentProperties: { tabs: mockTabs },
					imports: [
						RouterTestingModule.withRoutes(mockRoutes)
					],
					providers: [
						{
							provide: ActivatedRoute,
							useValue: {
								parent: {
									snapshot: { url: [{ path: 'chat' }, { path: 'groups' }] }
								},
								snapshot: { url: [{ path: 'group-1' }] }
							}
						},
						mockRouteAnimationService
					]
				}
			);

			router = TestBed.inject(Router);
			component = fixture.nativeElement;
			componentFixture = fixture;

			router.initialNavigation();
			await router.navigate(['/chat/groups/group-1']);
			tick();
			componentFixture.detectChanges();
			tick();
		}));

		it('is accessible', async () => {
			expect(await axe(component)).toHaveLessThanXViolations(3); // TODO: Fix document structure issues
		});

		it('renders the back button', fakeAsync(() => {
			expect(router.url).toBe('/chat/groups/group-1');
			expect(screen.getByRole('button', { name: 'Go back' })).toBeVisible();
		}));
	});
});