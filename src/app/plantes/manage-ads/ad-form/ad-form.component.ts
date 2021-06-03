import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdsService } from 'src/app/services/ads.service';
import { Router } from '@angular/router';


import { AddCatogoryService } from 'src/app/admin/Admin-services/add-catogory.service';
import { JSDocCommentStmt } from '@angular/compiler';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss']
})
export class AdFormComponent implements OnInit {
  adForm!: FormGroup;
  ad: any = {};
  category: any= {};
  imagePreview: String;
  connectedUserId: any
  constructor(private formBuilder: FormBuilder,
    private addService: AdsService,
    private route: Router,
    private AddCategoryService: AddCatogoryService) { }

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
      image: ['']
    });



  }




  // add() {
  //   this.ad.userId = JSON.parse(localStorage.getItem('connectedUser'));
  //   this.ad.vendu = false
  //   this.addService.addAd(this.ad, this.adForm.value.image).subscribe(
  //     () => {
  //       console.log("added succesfully");
  //       this.route.navigate(["ads"]);
  //     });
  // }

  getAllCategories() {
    this.AddCategoryService.getAllCategories().subscribe(
      (data) => {
        this.category = data.category;
        console.log('here gett all ca', this.category);

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



  add() {
    var isConnectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (isConnectedUser == null) {
      this.route.navigate(['login']);

    } else {
      this.ad.userId = JSON.parse(localStorage.getItem('connectedUser'));
      this.ad.vendu = false
      this.addService.addAd(this.ad, this.adForm.value.image).subscribe(
        () => {
          console.log("added succesfully");
          this.route.navigate(["ads"]);
        });
    }
  }





}
