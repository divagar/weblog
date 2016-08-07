import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Routes, Router, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DomSanitizationService } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Title } from '@angular/platform-browser';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  fbBlogs: Observable<any[]>;

  public constructor(
                  public af: AngularFire,
                  private titleService: Title) {

    //Set page title
    this.titleService.setTitle("Weblog | Home");

    //Get Blogs
    this.getBlogs();
  }

  ngOnInit() { }

  getBlogs() {
    var query: string = '/Blogs';
    console.log(query);
    this.fbBlogs = this.af.database.list(query, {}).map((_blogs) => {
      return _blogs.map((_blog) => {
        return _blog;
      })
    });
  }

}