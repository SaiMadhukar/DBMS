import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { UserDetailsService } from './user-details.service';
import { HttpClientModule   } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainscreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
