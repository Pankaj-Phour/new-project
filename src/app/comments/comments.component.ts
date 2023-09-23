import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor() { }

  commentsData:any = [
    {
      user_name:'Tony Stark',
      user_id:12345,
      comment:'Nice video.',
      time:'1 hour ago',
      background:'green'
    },
    {
      user_name:'Bruce Banner',
      user_id:12345,
      comment:'Did not understand anything from the video.',
      time:'4 hours ago',
      background:'brown'
    },
    {
      user_name:'Steve Rogers',
      user_id:12345,
      comment:'Fall in love with the nature.',
      time:'yesterday',
      background:'blue'
    },
    {
      user_name:'Thor',
      user_id:12345,
      comment:'Not seen something like that before',
      time:'5 days ago',
      background:'green'
    },
    {
      user_name:'Natasha',
      user_id:12345,
      comment:'Good video.',
      time:'1 month ago',
      background:'brown'
    },
    {
      user_name:'Dr. Steven Strange',
      user_id:12345,
      comment:'Very nice',
      time:'12 hours ago',
      background:'pink'
    },
    {
      user_name:'Wanda',
      user_id:12345,
      comment:'Enjoying the video.',
      time:'2 days ago',
      background:'orange'
    },
    {
      user_name:'Barry Allen',
      user_id:12345,
      comment:'Good',
      time:'yesterday',
      background:'red'
    },
    {
      user_name:'Clark kent',
      user_id:12345,
      comment:'Watched this video 100 times still not bored.',
      time:'09:18',
      background:'grey'
    },
    {
      user_name:'Bruce wayne',
      user_id:12345,
      comment:'One of the best videos seen on internet.',
      time:'09:18',
      background:'green'
    },
    {
      user_name:'Peter Parker',
      user_id:12345,
      comment:'Hi guys, Just wanna tell you its a nice video',
      time:'09:18',
      background:'blue'
    }
  ];

  ngOnInit(): void {
  }

}
