import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AdsService {
	constructor(private httpClient: HttpClient) { }

	adUrl = 'http://localhost:3001/ads';

	addAd(ad: any, image: File) {
		const formData = new FormData();
		formData.append('productName', ad.productName);
		formData.append('category', ad.category);
		formData.append('description', ad.description);
		formData.append('price', ad.price);
		formData.append('image', image);
		formData.append('userId', ad.userId);
		formData.append('vendu', ad.vendu);

		return this.httpClient.post<{ message: string }>(this.adUrl, formData);
	}


	getAllAds() {
		return this.httpClient.get<{ ads: any }>(this.adUrl);
	}
	getAllAdsSold(id:any) {
		return this.httpClient.get<{ ads: any }>(`${this.adUrl}/vendu/${id}`);
	}

	getAdById(id: any) {
		return this.httpClient.get<{ ad: any }>(`${this.adUrl}/${id}`);
	}
	getAdByUserId(id: any) {
		return this.httpClient.get<{ ad: any }>(`${this.adUrl}/user/${id}`);
	}

	deleteAdByUser(id: any) {
		return this.httpClient.delete<{ message: String }>(`${this.adUrl}/${id}`);
	}
	updateAdByUser(ad: any) {
		return this.httpClient.put<{ message: String }>(`${this.adUrl}/${ad._id}`, ad);
	}

	vendu(ad:any){
		return this.httpClient.put<{message:string}>(`${this.adUrl}/vendu/${ad._id}`, ad);
	}
}
