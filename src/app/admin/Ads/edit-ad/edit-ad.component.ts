import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddCatogoryService } from '../../Admin-services/add-catogory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss']
})
export class EditAdComponent implements OnInit {
  adForm!: FormGroup;
  connectedUserId: any
  ad: any = {};
  id: any;
  constructor(private formBuilder: FormBuilder,
    private adminAdService: AddCatogoryService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminAdService.getAdByIdFromAdmin(this.id).subscribe(
      (data) => {
        this.ad = data.ad

      })

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

  // editAdByAdmin() {
  //   this.adminAdService.updateAdByAdmin(this.ad).subscribe(
  //     () => {
  //       console.log('ad updated successfully from admin');

  //     });
  // }







}
