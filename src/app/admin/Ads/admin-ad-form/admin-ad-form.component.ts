import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdsService } from 'src/app/services/ads.service';
import { Router } from '@angular/router';
import { AddCatogoryService } from '../../Admin-services/add-catogory.service';
import { ToastType, Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-admin-ad-form',
  templateUrl: './admin-ad-form.component.html',
  styleUrls: ['./admin-ad-form.component.scss']
})
export class AdminAdFormComponent implements OnInit {
  adForm!: FormGroup;
  ad: any = {};
  category: any;
  imagePreview: String;
  connectedUserId:any;
  private types: Array<ToastType> = ['success'];
  private text = ' √ Annonce est bien ajouté';
  constructor(private formBuilder: FormBuilder,
    private addService: AdsService,
    private route: Router,
    private AddCategoryService: AddCatogoryService,
    private toaster: Toaster) { }

  ngOnInit() {
    this.getAllCategories();
    this.adForm = this.formBuilder.group({
      connectedUserId: this.connectedUserId,
      productName: [''],
      category: [''],
      description: [''],
      firstPicture: [''],
      secondPicture: [''],
      price: [''],
      image: [''],
      vendu: ['']
    });
  }

  add() {
    this.ad.vendu=false
    this.ad.userId = JSON.parse(localStorage.getItem('connectedUser'));
   this.addService.addAd(this.ad,this.adForm.value.image).subscribe(

     () => {
       console.log("added succesfully");
       this.route.navigate(["adminAds"]);
     });
     this.showToast();
 }

 onImageSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.adForm.patchValue({ image: file });
  this.adForm.updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string
  };
  reader.readAsDataURL(file);
}
getAllCategories() {
  this.AddCategoryService.getAllCategories().subscribe(
    (data) => {
      this.category = data.category;
      console.log('here category', this.category);
      
    });
}

get randomType() {
  return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
}
showToast() {
  const type = this.randomType;
  this.toaster.open({
   
    caption: this.text,
    type: type,
  });
}


}
