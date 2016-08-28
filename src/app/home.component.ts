import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  appTitle: string = "Weblog";
  pageTitle: string = "Home";
  fbBlogs: Observable<any[]>;

  public constructor(
                  public af: AngularFire,
                  private titleService: Title) {

    //Set page title
    this.titleService.setTitle(this.appTitle + " | " + this.pageTitle);

    //Get Blogs
    this.getBlogs();
  }

  ngOnInit() {}

  getBlogs() {
    var query: string = '/Blogs';
    console.log(query);
    this.fbBlogs = this.af.database.list(query, {}).map((_blogs) => {
      return _blogs.map((_blog) => {
        return _blog;
      })
    });
  }

  blogUrlEncode(str: String) {
    var ret: string = str.replace("[^a-zA-Z0-9//g]" , "-");
    return ret;
  }

}