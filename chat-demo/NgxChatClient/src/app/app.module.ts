import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ChatboxComponent } from './chat/chatbox/chatbox.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    FriendListComponent,
    ChatboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
