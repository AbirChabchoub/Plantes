import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddCatogoryService } from '../../Admin-services/add-catogory.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  category:any={};
  addCategory:FormGroup;
  constructor(private addCategoryService:AddCatogoryService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.addCategory=this.formBuilder.group(
      { 
        categoryName:['']
      });


  }

  addCategoryToSelect(){
    this.addCategoryService.AddCategory(this.category).subscribe(
      (data)=>{
     console.log( data.message);
      });
  }


}
