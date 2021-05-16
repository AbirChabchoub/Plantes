import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddCatogoryService {

  constructor(private httpClient:HttpClient) { }


  adminAdsUrl="http://localhost:3001/adCategory"
  AddCategory(category:any){
    return this.httpClient.post<{message:String}>(this.adminAdsUrl,category);
  }

getAllCategories(){
  return this.httpClient.get<{category:any}>(this.adminAdsUrl);
}

categoryName(category:any){
return this.httpClient.post<{message:String}>(this.adminAdsUrl,category);
}
deleteAd(id: any) {
  return this.httpClient.delete<{ message:String }>(`${this.adminAdsUrl}/${id}`);
}
updateAdByAdmin(ad:any){
  return this.httpClient.put<{message:String}>(`${this.adminAdsUrl}/${ad._id}`,ad);
}

getAdByIdFromAdmin(id:any){
  return this.httpClient.get<{ad:any}>(`${this.adminAdsUrl}/${id}`);
}

}
