import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home.component';
import { Title } from '@angular/platform-browser';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.css'],
  providers: [HomeComponent]
})

export class PostComponent implements OnInit {

  pageTitle: string = "Post";
  selectedBlogId: string;
  fbBlogDetails: FirebaseObjectObservable<any>;

  constructor(
    private home: HomeComponent,
    public af: AngularFire,
    //public params: RouteSegment,
    private titleService: Title) {

    //Set page title
    this.titleService.setTitle(this.home.appTitle + " | " + this.pageTitle);

    //Get params
    //console.log(this.params);

    //Get Blog Details

  }

  ngOnInit() { }

  getBlogDetails() {
    var query: string = '/Blogs/' + this.selectedBlogId;
    console.log(query);
    this.fbBlogDetails = this.af.database.object(query);
  }

}
