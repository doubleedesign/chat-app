import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { PageContentComponent } from '../page-content/page-content.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'app-signup-screen',
	standalone: true,
	imports: [
		NgIf,
		PageContentComponent,
		ReactiveFormsModule,
		RouterLink
	],
	templateUrl: './signup-screen.component.html',
	styleUrl: './signup-screen.component.scss'
})
export class SignupScreen implements OnInit {
	signupForm: FormGroup;
	submitted = false;

	constructor(private fb: FormBuilder, private router: Router) {
		this.signupForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}
	ngOnInit(): void {
		// Redirect to chat screen if user is already logged in
		const loggedIn = localStorage.getItem('chatty-user');
		if (loggedIn) {
			this.router.navigate(['/chat']);
		}
	}

	onSubmit() {
		this.submitted = true;

		if (this.signupForm.invalid) {
			return;
		}

		// TODO: Implement proper registration logic
		localStorage.setItem('chatty-user', JSON.stringify(this.signupForm.value.email));
		this.router.navigate(['/chat']);
	}
}
