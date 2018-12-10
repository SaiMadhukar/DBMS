import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    public message = ""
    public loginPageHidden = false

    constructor(private httpClient: HttpClient) {
    }

    getData() {

      var baseUrl = 'localhost:5000'
      var user =  {
        username: 'Sai',
        password: 'madhukar'
      }
      var headers = { content: "json",
                    
    }
      this.httpClient.post(baseUrl,user,{headers: headers}).subscribe(

        (data:any) => {
            console.log(data);
            
        }
      )
      
    }

    logIn(username,password) {
      console.log(username,password)
      if(username=="sai" && password=="madhukar") {
          this.loginPageHidden = true
          this.message = "Welcome " + username
          this.getBalance()
          this.loadScreen()
      }
      else{
        this.message = "Username or Password is Wrong"
      }
    }

    getBalance() {
      console.log("getting Balance Info....");
    }

    loadScreen() {
        console.log("loading all the screens");
    }
}

