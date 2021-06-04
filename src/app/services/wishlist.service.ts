import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistUrl="http://localhost:3001/wishlist"
  constructor(private httpClient:HttpClient) { }


getMyWishlist(userId:any){
  return this.httpClient.get<{wishlist:any}>(`${this.wishlistUrl}/${userId}`);
}



addToWishlist(wishlist:any){
  return this.httpClient.post<{ message: string }>(this.wishlistUrl, wishlist);
}

removeFromWishlist(id:any){
  return this.httpClient.delete<{message:any}>(`${this.wishlistUrl}/${id}`)

}

removeByAdId(id:any){
  return this.httpClient.delete<{message:any}>(`${this.wishlistUrl}/ads/${id}`)
}


}
