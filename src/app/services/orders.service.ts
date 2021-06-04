import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }
  orderUrl = "http://localhost:3001/orders";
  


addOrder(order:any){
return  this.httpClient.post<{message:string}>(this.orderUrl, order); 
}
getOrderByUserId(id:any){
  return this.httpClient.get<{order:any}>(`${this.orderUrl}/${id}`);
}
getAllOrders(){
  return this.httpClient.get<{orders:any}>(this.orderUrl);
}

deleteFromOrder(id:any){
return this.httpClient.delete<{message:String}>(`${this.orderUrl}/${id}`);
}

getOrdersPdf(){
  return this.httpClient.get<{message:String}>(`${this.orderUrl}/pdf`);
}

getOrderById(id:any){
  return this.httpClient.get<{order:any}>(`${this.orderUrl}/orderId/${id}`);
}

}
