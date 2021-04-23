import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private httpClient: HttpClient) { }

  adUrl = "http://localhost:3001/ads";



  addAd(ad: any, image: File) {
    const formData = new FormData();
    formData.append('productName', ad.productName);
    formData.append('category', ad.category);
    formData.append('description', ad.description);
    formData.append('price', ad.price);
    formData.append('image', image);
    return this.httpClient.post<{ message: string }>(this.adUrl, formData);
  }


  // addAd(ad: any) {
  
  //   return this.httpClient.post<{ message: string }>(this.adUrl,ad);
  // }

  getAllAds() {
    return this.httpClient.get<{ ads: any }>(this.adUrl);
  }

  deleteAd(id: any) {
    return this.httpClient.delete<{ message: string }>(`${this.adUrl}/${id}`);
  }


  getAdById(id: any) {
    return this.httpClient.get<{ad:any}>(`${this.adUrl}/${id}`);
  }

// getAdByUserId(){
//   return this.httpClient.get<{ad:any}>(`${this.adUrl}/${id}`)
// }



}
