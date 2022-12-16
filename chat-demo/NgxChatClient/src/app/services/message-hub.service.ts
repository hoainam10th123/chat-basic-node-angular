import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessageHubService {

  private messageThreadSource = new BehaviorSubject<any[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  socket = io('http://localhost:7000')
  groupName = ''
  
  constructor() { }

  createConnection(user: string, otherUsername: string){   
    this.socket = io('http://localhost:7000')
    this.groupName = this.getGroupName(user, otherUsername)
    this.socket.emit('OnConnectedRoom', {username: user, groupName:this.groupName})

    this.socket.on('NewMessage', (message)=>{
      console.log(message)
      this.messageThread$.pipe(take(1)).subscribe(messages => {
        this.messageThreadSource.next([...messages, message])
      })
    })
  }

  private getGroupName(text1: string, text2: string){
    const stringCompare = text1.localeCompare(text2) < 0
    return stringCompare ? `${text1}-${text2}` : `${text2}-${text1}`
  }

  sendMessage(recipientUsername: string, content: string){
    this.socket.emit('SendMessage', {recipientUsername, content, groupName: this.groupName})
  }

  disconnectedRoom(){
    this.socket.emit('OnDisConnectedRoom', this.groupName)
    this.socket.disconnect()
  }
}
