import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class OrdersService {
	constructor(private httpClient: HttpClient) {}
	orderUrl = 'http://localhost:3001/orders';

	addOrder(order: any) {
		return this.httpClient.post<{ message: string }>(this.orderUrl, order);
	}
	getOrderByUserId(id: any) {
		return this.httpClient.get<{ order: any }>(`${this.orderUrl}/${id}`);
	}
}
