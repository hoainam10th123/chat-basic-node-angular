import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faMinus, faClose } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MessageHubService } from 'src/app/services/message-hub.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  providers: [MessageHubService]//separate services independently for every component
})
export class ChatboxComponent implements OnInit, AfterViewInit {

  faMinus = faMinus
  faClose = faClose

  messageContent: string = ''

  @Input() username: string;
  @Input() right: number;

  @Output() removeChatBox = new EventEmitter();
  @ViewChild('messageForm') messageForm: NgForm;

  currentUser: IUser;
  
  constructor(public messageService: MessageHubService, public account: AccountService) {
    this.account.currentUser$.subscribe(user=>{
      this.currentUser = user
    })
  }

  ngOnInit(): void {
    this.messageService.createConnection(this.currentUser.username, this.username)
  }

  ngAfterViewInit() {
    var chatBox = document.getElementById(this.username);
    chatBox.style.right = this.right + "px";
  }

  minimumBoxChat(){}

  closeBoxChat(){
    this.removeChatBox.emit(this.username);
  }

  sendMessage(){
    this.messageService.sendMessage(this.username, this.messageContent)
    this.messageContent = ''
  }
}
