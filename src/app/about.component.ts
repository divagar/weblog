import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home.component';
import { Title } from '@angular/platform-browser';

@Component ({
    moduleId: module.id,
    selector: 'about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css']
})
export class AboutComponent implements OnInit {

  pageTitle: string = "About";

  constructor(
    private home: HomeComponent,
    private titleService: Title) {

    //Set page title
    this.titleService.setTitle(this.home.appTitle + " | " + this.pageTitle);
  }

  ngOnInit() {}

}



