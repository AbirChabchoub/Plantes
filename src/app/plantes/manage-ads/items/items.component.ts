import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';
import { AddCatogoryService } from 'src/app/admin/Admin-services/add-catogory.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Output() selectedItem: EventEmitter<any> = new EventEmitter(); 
  categoryName:string;
  categories:any;
  constructor(private addCategoryService:AddCatogoryService) { }

  ngOnInit() {
    this. getAllCategories();
  }

  getAllCategories(){
    this.addCategoryService.getAllCategories().subscribe(
      (data)=>{
        console.log('here categories', data.category);
        
        this.categories=data.category;
      });
  }


  clickme($event) {
    const evtMsg = $event.target.textContent;
    this.categoryName=evtMsg;
    alert(this.categoryName);
    this.selectedItem.emit(this.categoryName);
		
	}

}
