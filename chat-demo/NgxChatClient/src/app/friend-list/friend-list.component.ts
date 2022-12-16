import { Component, OnInit } from '@angular/core';
import { UserChatBox } from '../models/userchatbox';
import { PresenceService } from '../services/presence.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  friendList: string []
  usersOnline: UserChatBox[] = []

  constructor(private presence: PresenceService) {
    this.presence.onlineUsers$.subscribe(users=>{
      this.friendList = users
    })
  }

  ngOnInit(): void {
    
  }

  selectUser(user: string) {
    switch (( this.usersOnline.length + 1 ) % 2 ) {
      case 1: {
        var u = this.usersOnline.find(x => x.username === user);
        if (u) {
          this.usersOnline = this.usersOnline.filter(x => x.username !== user);
          this.usersOnline.push(u);
        } else {
          this.usersOnline.push(new UserChatBox(user, 250));
        }        
        break;
      }
      case 0: {
        var u = this.usersOnline.find(x => x.username === user);
        if (u) {
          this.usersOnline = this.usersOnline.filter(x => x.username !== user);
          this.usersOnline.push(u);
        } else {
          this.usersOnline.push(new UserChatBox(user, 250 + 325));
        }
        break;
      }
      default: {
        alert('No chat box')
        break;
      }
    }
  }

  removeChatBox(event: string) {
    this.usersOnline = this.usersOnline.filter(x => x.username !== event);
  }

}
