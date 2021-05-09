import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdsService } from 'src/app/services/ads.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.scss' ]
})
export class ProfileComponent implements OnInit {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private usersService: UsersService,
		private adsService: AdsService
	) {}
	id: any;
	user: any = {};
	connectedUser: any;
	ad: any;
	ngOnInit() {
		this.connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.usersService.getConnectedUser(this.id).subscribe((data) => {
			this.user = data.users;
		});

		this.adsService.getAdByUserId(this.connectedUser).subscribe((data) => {
			this.ad = data.ad;
		});
	}

	goToEditProfile() {
		let connectedUserId = JSON.parse(localStorage.getItem('connectedUser'));
		this.router.navigate([ `editProfile/${connectedUserId}` ]);
	}

	goToAdForm() {
		this.router.navigate([ 'adForm' ]);
	}

	// onImageSelected(event: Event) {
	// 	const file = (event.target as HTMLInputElement).files[0]; 
	// 	console.log('Here my file', file);
		
	// 	this.addMatchForm.patchValue({ image: file }); 
	// 	this.addMatchForm.updateValueAndValidity();
	// 	const reader = new FileReader();
	// 	reader.onload = () => {
	// 	  this.imagePreview = reader.result as string
	// 	}; reader.readAsDataURL(file);
	//   }



}
