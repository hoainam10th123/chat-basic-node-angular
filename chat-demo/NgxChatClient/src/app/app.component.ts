import { Component, OnInit } from '@angular/core';
import { IUser } from './models/user';
import { AccountService } from './services/account.service';
import { PresenceService } from './services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NgxChatClient';

  constructor(private presence: PresenceService, private accountService: AccountService){}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  private setCurrentUser() {
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createConnection(user);     
    }
  }

}
