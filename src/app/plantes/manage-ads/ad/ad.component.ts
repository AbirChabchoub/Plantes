import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  @Input()adsInput:any;
  constructor(private router:Router) { }

  ngOnInit() {
  }


  goToProductDetails(id:any){
    this.router.navigate([`product-details/${id}`]);
  }

}
