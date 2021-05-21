import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdsService } from 'src/app/services/ads.service';
import { AddCatogoryService } from 'src/app/admin/Admin-services/add-catogory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss']
})
export class EditAdComponent implements OnInit {
  category: any;
  adForm!: FormGroup;
  connectedUserId: any;
  imagePreview: String;
  id:any
  ad:any={}
  constructor(private formBuilder: FormBuilder,
    private adsService:AdsService,
    private AddCategoryService: AddCatogoryService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.adsService.getAdById(this.id).subscribe(
      (data)=>{
this.ad=data.ad;
      }
    )
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


  getAllCategories() {
    this.AddCategoryService.getAllCategories().subscribe(
      (data) => {
        this.category = data.category;
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

editAd(){
  this.adsService.updateAdByUser(this.ad).subscribe(
    ()=>{
      console.log('ad updated successfully');
      
    }
  )
}



}
