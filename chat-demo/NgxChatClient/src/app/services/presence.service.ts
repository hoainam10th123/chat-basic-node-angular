import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { io } from 'socket.io-client';
import { IUser } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  socket = io('http://localhost:7000')

  private onlineUsersSource = new BehaviorSubject<string[]>([])
  onlineUsers$ = this.onlineUsersSource.asObservable()

  constructor() { }

  createConnection(user:IUser){
    this.socket = io('http://localhost:7000')
    this.socket.emit('OnConnected', user.username)

    this.socket.on('GetOnlineUsers', (userOnline)=>{
      console.log('GetOnlineUsers')
      console.log(userOnline)
      this.onlineUsersSource.next(userOnline);
    })

    this.socket.on('UserIsOnline', (user)=>{
      console.log(user + ' online')
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.onlineUsersSource.next([...usernames, user])
      })
    })

    this.socket.on('UserIsOffline', (username: string)=>{
      console.log(username + ' Offline')
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.onlineUsersSource.next([...usernames.filter(x => x !== username)])
      })
    })
  }

  stopConnection(){
    this.socket.disconnect()
  }

}
