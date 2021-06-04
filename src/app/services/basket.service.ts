import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
	basketUrl = 'http://localhost:3001/basket';

  constructor(private httpClient:HttpClient) { }
  basketdbasket(basket: any, image: File) {
		const formData = new FormData();
		formData.append('productName', basket.productName);
		formData.append('category', basket.category);
		formData.append('price', basket.price);
		formData.append('image', image);
		formData.append('basketUserId', basket.basketUserId);
		formData.append('vendu', basket.vendu);

		return this.httpClient.post<{ message: string }>(this.basketUrl, formData);
	}
}
