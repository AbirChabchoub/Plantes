import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdsService } from 'src/app/services/ads.service';
import { Router } from '@angular/router';
import { AddCatogoryService } from '../../Admin-services/add-catogory.service';

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
  constructor(private formBuilder: FormBuilder,
    private addService: AdsService,
    private route: Router,
    private AddCategoryService: AddCatogoryService) { }

  ngOnInit() {
  
    this.adForm = this.formBuilder.group({
      connectedUserId: this.connectedUserId,
      productName: [''],
      category: [''],
      description: [''],
      firstPicture: [''],
      secondPicture: [''],
      price: [''],
      image: ['']
    });
  }

  add() {
    
    this.ad.userId = JSON.parse(localStorage.getItem('connectedUser'));
   this.addService.addAd(this.ad,this.adForm.value.image).subscribe(

     () => {
       console.log("added succesfully");
       this.route.navigate(["ads"]);
     });
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


}
