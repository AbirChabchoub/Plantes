import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminBlogService } from '../Admin-services/admin-blog.service';
import { Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  imagePreview: String;
  blogForm: FormGroup;
  blog: any = {};
  condition: any
  private types: Array<ToastType> = ['success'];
  private text = ' √ Votre article est bien ajouté';
  constructor(private formBuilder: FormBuilder,
    private blogService: AdminBlogService, private toaster: Toaster) { }

  ngOnInit() {
    this.blogForm = this.formBuilder.group({
      title: [''],
      article: [''],
      image: [''],

    });
  }

  addArticleToBlog() {
    this.blogService.addBlog(this.blog, this.blogForm.value.image).subscribe(
      (data) => {
        console.log(' article added successfully', data.message);
        this.condition = data.message

      });

    this.showToast();


  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.blogForm.patchValue({ image: file });
    this.blogForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
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
