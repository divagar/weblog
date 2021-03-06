import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home.component';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { Routes, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var hljs: any;
declare var jQuery: any;

@Component({
  selector: 'post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.css']
})

export class PostComponent implements OnInit {

  pageTitle: string = "Post";
  selectedBlogId: string;
  fbBlogDetails: FirebaseObjectObservable<any>;

  constructor(
    public af: AngularFire,
    private home: HomeComponent,
    private route: ActivatedRoute,
    private titleService: Title,
    public sanitizer: DomSanitizer) {

    //Set page title
    this.titleService.setTitle(this.home.appTitle + " | " + this.pageTitle);

    //Get params
    route.params.subscribe(
      params => {
        this.selectedBlogId = params['id'];
      }
    );

    //Get Blog Details
    this.getBlogDetails();
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  getBlogDetails() {
    var query: string = '/Blogs/' + this.selectedBlogId;
    console.log(query);
    this.fbBlogDetails = this.af.database.object(query);
  }

  codeHgl() {
    jQuery('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });
  }
}
