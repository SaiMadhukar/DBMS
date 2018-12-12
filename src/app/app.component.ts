import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    public message = ""
    public userID = ""
    public enteredSSN = ""
    public balance = ""
    public name = ""
    public type = 1
    public errorMessage = "Message: "
    public emailId = ""
    public additionalAccounts = []
    public primaryBankId = ""
    public requestMessage= ""
    public requestMessageRequired = false
    
    public isMessageRequired = false
    public loginPageHidden = false
    public showData = false

    constructor(private httpClient: HttpClient) {
    }

    changeScreens(toNumber) {
      this.type = toNumber
    }

    getUsersData(ssn) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      }
      var baseUrl = 'localhost:5000/userdetails';
      this.httpClient.post(baseUrl,{'none':'working'},httpOptions).subscribe( (response: string[]) => {
          console.log(response);
          console.log(response['123456789']);
      });
    }
    postData(command) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      this.httpClient.post('http://localhost:5000',command,httpOptions).subscribe( (response: String[]) => {
        console.log(response['status'])

        if(response['status'].match('true')) {

          var userData = response['user_data']
          this.balance = userData[2]
          console.log(userData[2]);
          
          this.userID = this.enteredSSN
          this.name = userData[1]
          this.emailId = response['email_id']
          this.additionalAccounts = response['additional_accounts']
          this.primaryBankId = userData[4]
          console.log(this.emailId);
          
          this.loginPageHidden = true
          this.showData = true
        }
        else{
          console.log("failed to fetch users");
        }
      })
    }
    logIn(ssn) {

      console.log(ssn)
      this.enteredSSN = ssn
      var temp = 'select * from user_account where ssn=' + ssn
      console.log(temp)
      var command = JSON.stringify({
        'command': temp,
        'ssn': this.enteredSSN
      });
    this.postData(command)
    }
    sendMoneyConfirm(emailid,amount) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

      console.log("In Send Money Screen")
      if(amount > this.balance){
        this.isMessageRequired = true
        this.errorMessage += 'Sufficient Money Not Availbale'
        return 
      }
      var command = {
          'email_id': emailid,
          'ssn': this.userID,
          'amount': amount
      }
      this.httpClient.post('http://localhost:5000/sendmoney',command,httpOptions).subscribe( (response: String[]) => {
        console.log(response) 
        if(response['status'].match('true')){
            console.log("Money Transfered");
            this.isMessageRequired = true
            this.errorMessage = 'Money Transferred Sucessfully'
            this.balance = response['balance']
        }
        else{
          this.isMessageRequired = true
          console.log("Money Transfer Failed");
          this.errorMessage = 'Money Transferred Failed'
        }
        })
    }
    requestMoney(remailid,ramount) {

      console.log("Requesting for Money",remailid,ramount);
      this.requestMessage = "Request Successfull"
      this.requestMessageRequired = true
      
    }
}

