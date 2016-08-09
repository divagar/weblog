import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home.component';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.css'],
    providers: [HomeComponent]
})

export class PostComponent implements OnInit {

  pageTitle: string = "Post";

  constructor(
    private home: HomeComponent,
    private titleService: Title) {

    //Set page title
    this.titleService.setTitle(this.home.appTitle + " | " + this.pageTitle);
  }

  ngOnInit() {}

}
