import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistUrl="http://localhost:3001/wishlist"
  constructor(private httpClient:HttpClient) { }






addToWishlist(wishlist:any){
  return this.httpClient.post<{ message: string }>(this.wishlistUrl, wishlist);
}

removeFromWishlist(adId:any){
  return this.httpClient.delete<{message:any}>(`${this.wishlistUrl}/${adId}`)

}



}
