import { Component, OnInit } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { PageContentComponent } from '../page-content/page-content.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login-screen',
	standalone: true,
	imports: [
		MessageBoxComponent,
		PageContentComponent,
		NgIf,
		ReactiveFormsModule,
		CommonModule
	],
	templateUrl: './login-screen.component.html',
	styleUrl: './login-screen.component.scss'
})
export class LoginScreen implements OnInit {
	loginForm: FormGroup;
	submitted = false;

	constructor(private fb: FormBuilder, private router: Router) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	ngOnInit(): void {
		const loggedIn = localStorage.getItem('chatty-user');

		if (loggedIn) {
			this.router.navigate(['/chat']);
		}
	}

	onSubmit() {
		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}

		// TODO: Implement proper login logic
		localStorage.setItem('chatty-user', JSON.stringify(this.loginForm.value.email));
		this.router.navigate(['/chat']);
	}
}
