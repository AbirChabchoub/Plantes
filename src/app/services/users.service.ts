import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../../backend/models/user';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	userUrl = 'http://localhost:3001/users';
	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
	constructor(private httpClient: HttpClient, private router: Router) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('connectedUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}
	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

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
				this.router.navigate([ '/' ]);
			}
			this.currentUserSubject.next(user);
			return user;
		});
	}

	logout() {
		localStorage.removeItem('connectedUser');
		this.currentUserSubject.next(null);
	}

	updateProfil(user: any) {
		return this.httpClient.put<{ message: string }>(`${this.userUrl}/${user._id}`, user);
	}

	getConnectedUser(id: any) {
		return this.httpClient.get<{ users: any }>(`${this.userUrl}/${id}`);
	}
}
