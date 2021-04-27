import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	userUrl = 'http://localhost:3001/users';
	private authStatusListener = new BehaviorSubject<boolean>(false);
	private isUserAuthenticated = false;
	constructor(private httpClient: HttpClient, private router: Router) {}

	addUserToDB(user: any) {
		return this.httpClient.post<{ message: String }>(`${this.userUrl}/signup`, user);
	}

	login(user: any) {
		console.log('here user service', user);

		return this.httpClient.post<{ user: any }>(`${this.userUrl}/login`, user).subscribe((res) => {
			console.log(res);
			localStorage.setItem('connectedUser', JSON.stringify(res.user.id));
			if (res.user.role == 'user') {
				this.router.navigate([ '/' ]);
			} else {
				this.router.navigate([ 'admin' ]);
			}
			this.isUserAuthenticated = true;
			this.authStatusListener.next(!this.authStatusListener.value);
		});
	}

	getAuthStatusListener() {
		return this.authStatusListener.asObservable();
	}

	isUserAuth() {
		return this.isUserAuthenticated;
	}

	logout() {
		this.isUserAuthenticated = false;
		this.authStatusListener.next(false);
		this.router.navigate([ '/' ]);
		localStorage.removeItem('connectedUser');
	}

	private saveAuthData(token: string, expirationDate: Date) {
		localStorage.setItem('token', token);
		localStorage.setItem('expiration', expirationDate.toISOString());
	}
	private clearAuthData() {
		localStorage.removeItem('token');
		localStorage.removeItem('expiration');
	}

	updateProfil(user: any) {
		return this.httpClient.put<{ message: string }>(`${this.userUrl}/${user._id}`, user);
	}

	getConnectedUser(id: any) {
		return this.httpClient.get<{ users: any }>(`${this.userUrl}/${id}`);
	}
}
