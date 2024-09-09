import { animate, group, query, style } from '@angular/animations';

function handlePositioning() {
	return query(':enter, :leave', [
		style({
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%'
		})
	], { optional: true });
}

export const animations = {
	swapDown() {
		return ([
			handlePositioning(),
			// Group to run the enter and leave animations in parallel
			group([
				query(':leave', [
					style({ opacity: 1, transform: 'translateY(0)' }),
					animate('0.3s ease-out', style({ opacity: 0, transform: 'translateY(100px)' }))
				], { optional: true }),
				query(':enter', [
					style({ opacity: 0, transform: 'translateY(100px)' }),
					animate('0.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
				], { optional: true })
			])
		]);
	},
	swapLeftToRight() {
		return ([
			handlePositioning(),
			group([
				query(':leave', [
					style({ transform: 'translateX(0)' }),
					animate('0.3s ease-out', style({ opacity: 0, transform: 'translateX(-100px)' }))
				], { optional: true }),
				query(':enter', [
					style({ transform: 'translateX(-100px)' }), // Entering element starts from the right
					animate('0.3s ease-in', style({ transform: 'translateX(0)' }))
				], { optional: true })
			])
		]);
	},
	crossFade() {
		return ([
			handlePositioning(),
			group([
				query(':leave', [
					style({ opacity: 1 }),
					animate('0.3s ease-out', style({ opacity: 0 }))
				], { optional: true }),
				query(':enter', [
					style({ opacity: 0 }),
					animate('0.3s ease-in', style({ opacity: 1 }))
				], { optional: true })
			])
		]);
	}
};
