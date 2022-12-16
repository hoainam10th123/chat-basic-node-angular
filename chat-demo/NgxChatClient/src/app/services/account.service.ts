import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private presence: PresenceService) { }

  login(model: any){
    return this.http.post(this.baseUrl+'/users/login', model).pipe(
      map((res:IUser)=>{
        const user = res;
        if(user){
          this.setCurrentUser(user);
          this.presence.createConnection(user);
        }
      })
    )
  }

  setCurrentUser(user: IUser){
    if(user){
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user); 
    }      
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopConnection();
  }

  register(model:any){
    return this.http.post(this.baseUrl+'/users/register', model).pipe(
      map((res:IUser)=>{
        if(res){
          this.setCurrentUser(res);
          this.presence.createConnection(res);
        }
        return res;
      })
    )
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
