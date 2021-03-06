import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home.component';
import { Title } from '@angular/platform-browser';

@Component ({
    selector: 'contact',
    templateUrl: 'contact.component.html',
    styleUrls: ['contact.component.css']
})
export class ContactComponent implements OnInit {

  pageTitle: string = "Contact";

  constructor(
    private home: HomeComponent,
    private titleService: Title) {

    //Set page title
    this.titleService.setTitle(this.home.appTitle + " | " + this.pageTitle);
  }

  ngOnInit() {}

}



