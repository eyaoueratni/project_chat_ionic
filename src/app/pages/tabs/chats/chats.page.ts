import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
 chats=Array(10);
  constructor() {
    addIcons({
      
    })
   }

  ngOnInit() {
  }

}
