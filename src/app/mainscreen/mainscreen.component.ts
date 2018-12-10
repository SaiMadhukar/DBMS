import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.css']
})
export class MainscreenComponent implements OnInit {


  public currentUser =  [
    {key: 'name',   value: 'sai madhukar'},
    {key: 'phone', value: '8978817282'},
    {key: 'balance',value: '160'}
  ];
  constructor() { }
  
  ngOnInit() {

  }
}
