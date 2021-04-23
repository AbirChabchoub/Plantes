import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() commentsInput: any;
  @Input() isResponseDisabled:any;
  actualDate: any;
  constructor() { }

  ngOnInit() {
  }

}
