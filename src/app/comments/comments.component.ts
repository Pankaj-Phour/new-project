import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  commentForm: FormGroup;
  inputFocused = false;
  user: any;
  @Input() selectedVideo:any;

  constructor(private _fb: FormBuilder, private _api: ApiService) { }
  @ViewChild('input') input: ElementRef;

  commentsData: any = [
    {
      user_name: 'Tony Stark',
      user_id: 12345,
      comment: 'Nice video.',
      time: '1 hour ago',
      background: 'green'
    },
    {
      user_name: 'Bruce Banner',
      user_id: 12345,
      comment: 'Did not understand anything from the video.',
      time: '4 hours ago',
      background: 'brown'
    },
    {
      user_name: 'Steve Rogers',
      user_id: 12345,
      comment: 'Fall in love with the nature.',
      time: 'yesterday',
      background: 'blue'
    },
    {
      user_name: 'Thor',
      user_id: 12345,
      comment: 'Not seen something like that before',
      time: '5 days ago',
      background: 'green'
    },
    {
      user_name: 'Natasha',
      user_id: 12345,
      comment: 'Good video.',
      time: '1 month ago',
      background: 'brown'
    },
    {
      user_name: 'Dr. Steven Strange',
      user_id: 12345,
      comment: 'Very nice',
      time: '12 hours ago',
      background: 'pink'
    },
    {
      user_name: 'Wanda',
      user_id: 12345,
      comment: 'Enjoying the video.',
      time: '2 days ago',
      background: 'orange'
    },
    {
      user_name: 'Barry Allen',
      user_id: 12345,
      comment: 'Good',
      time: 'yesterday',
      background: 'red'
    },
    {
      user_name: 'Clark kent',
      user_id: 12345,
      comment: 'Watched this video 100 times still not bored.',
      time: '09:18',
      background: 'grey'
    },
    {
      user_name: 'Bruce wayne',
      user_id: 12345,
      comment: 'One of the best videos seen on internet.',
      time: '09:18',
      background: 'green'
    },
    {
      user_name: 'Peter Parker',
      user_id: 12345,
      comment: 'Hi guys, Just wanna tell you its a nice video',
      time: '09:18',
      background: 'blue'
    }
  ];

  ngOnInit(): void {
    this.getCommentData();
    this.user = localStorage.getItem('user');
    console.log(this.user);
    if (this.user) {
      this.user = JSON.parse(this.user)
    }
    this.validation();
    console.log("Sending data to the singleVideo component");

    this._api.addComment(this.commentsData)
  }

  validation() {
    this.commentForm = this._fb.group({
      comment: ['', Validators.required]
    })
  }
  onFocus(e: any) {
    this.inputFocused = true;
  }

  cancel() {
    this.inputFocused = false;
    this.commentForm.reset();
  }
  addComment() {
    console.log(this.commentForm.value);
    if (this.user) {
      let comment = {
        comment: this.commentForm.value.comment,
        time: 'Just now',
        user_id: 12345,
        user_name: this.user ? this.user.name : this.commentsData[2].user_name,
        background: 'orange'
      }
      this.commentsData.unshift(comment)
      this.input.nativeElement.blur();
      this.commentForm.reset();
      this.inputFocused = false;
      this._api.addComment(this.commentsData)
      let params = {
        videoId:this.selectedVideo._id,
        text:this.commentForm.value.comment
      }
      this._api.updateComment('/comment/addComment',params).subscribe((res:any)=>{
        console.log(res);
        
      })
    }
    else {
      this._api.obNotify({
        start: true,
        code: 200,
        status: 'error',
        message: 'Please login to comment on any video.'
      })
    }
  }

  getCommentData(){
    this._api.getComments(`/comment/getComments?videoId=${this.selectedVideo._id}`).subscribe((res:any)=>{
      console.log("Response from comments api",res);
      
    })
  }


  closeComments(){
    console.log("Closing comments ");
    this._api.toggleCommentSection(true)
  }
}
