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
deleteCategory(id: any) {
  return this.httpClient.delete<{ message:String }>(`${this.adminAdsUrl}/${id}`);
}
deleteAdByAdmin(id: any) {
  return this.httpClient.delete<{ message:String }>(`${this.adminAdsUrl}/ad/${id}`);
}
// updateAdByAdmin(ad:any){
//   return this.httpClient.put<{message:String}>(`${this.adminAdsUrl}/ad/${ad._id}`,ad);
// }

getAdByIdFromAdmin(id:any){
  return this.httpClient.get<{ad:any}>(`${this.adminAdsUrl}/${id}`);
}

updateAdByAdmin(ad: any , image:File) {
  const formdata = new FormData();
  formdata.append('productName', ad.productName);
  formdata.append('category', ad.category);
  formdata.append('description', ad.description);
  formdata.append('price', ad.price);
  formdata.append('userId', ad.userId);
  formdata.append('vendu', ad.vendu);
  
  formdata.append('image', image);

  return this.httpClient.put<{ message: string }>(`${this.adminAdsUrl}/${ad._id}`,formdata);
}

}
