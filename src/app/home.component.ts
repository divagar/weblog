import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { Subject } from 'rxjs/Subject';
import { Title } from '@angular/platform-browser';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
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
  }

  ngOnInit() {
    //Get Blogs
    this.getBlogs();
  }

  getBlogs() {
    var query: string = '/Blogs';
    console.log(query);
    this.fbBlogs = map.call(this.af.database.list(query, {}), (_blogs: any[]) => {
      return _blogs.map((_blog) => {
        return _blog;
      })
    });
  }

  blogUrlEncode(str: String) {
    if (str != null)
      return str.replace(/[^a-zA-Z0-9]/g, "-");
  }

}