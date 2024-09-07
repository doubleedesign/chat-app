import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
	selector: 'app-expandable',
	standalone: true,
	templateUrl: './expandable.component.html',
	imports: [
		NgIf,
		NgClass
	],
	styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent {
	@Input() label: string = '';
	@Input() direction: 'up' | 'down' = 'down';

	isExpanded: boolean = false;
	contentHeight: string = '0px';

	@ViewChild('content') content!: ElementRef;

	ngAfterViewInit(): void {
		// Calculate the height of the content after it renders
		this.contentHeight = this.content.nativeElement.scrollHeight + 'px';
	}

	toggle(): void {
		this.isExpanded = !this.isExpanded;
	}
}
