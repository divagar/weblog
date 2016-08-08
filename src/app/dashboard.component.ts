import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Routes, Router, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/RX';
import { Title } from '@angular/platform-browser';

declare var jQuery: any;
declare var CKEDITOR: any;

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  providers: [LoginComponent]
})

export class DashboardComponent implements OnInit, AfterViewInit {

  fbBlogs: Observable<any[]>;
  fbBlogDetails: FirebaseObjectObservable<any>;
  fbNewBlog: FirebaseListObservable<any>;

  dAlert: boolean;
  dAlertMsg: string;
  dAlertType: string;

  timerCkeditor: any;

  addNewBlogFlag: boolean;
  editBlogFlag: boolean;

  constructor(public af: AngularFire,
    public loginUser: LoginComponent,
    public router: Router,
    private titleService: Title) {

    //Set page title
    this.titleService.setTitle("Weblog | Dashboard");

    //get af auth status
    af.auth
      .do(v => this.dashboardLogin(v))
      .subscribe(user => this.dashboardLogin(user))
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  dashboardLogin(user) {
    //check user credentials
    this.loginUser.userCredentials(user);
    if (this.loginUser.user == null)
      this.router.navigate(['/login']);
    else
      //Get Blogs
      this.getBlogs();
  }

  loadCKEditor(details: string) {
    clearTimeout(this.timerCkeditor);
    if (CKEDITOR.instances['ckEditor'] == undefined) {
      this.timerCkeditor = setTimeout(() => this.setCKEditorContent(details), 1000);
    }
  }
  setCKEditorContent(details: string) {
    CKEDITOR.replace('ckEditor');
    CKEDITOR.instances.ckEditor.setData(details);
  }

  dashboardLogout() {
    this.loginUser.logoutUser();
  }

  newBlog() {
    this.addNewBlogFlag = true;
    this.editBlogFlag = false;
    this.fbBlogDetails = null;

    //ckEditor cleanup
    if (CKEDITOR.instances.ckEditor != undefined) {
      CKEDITOR.instances.ckEditor.setData("");
    }
  }
  editBlog(blogKey) {
    this.editBlogFlag = true;
    this.addNewBlogFlag = false;

    //ckEditor cleanup
    if (CKEDITOR.instances.ckEditor != undefined) {
      CKEDITOR.instances.ckEditor.destroy();
    }

    //get blog details
    this.getBlogDetails(blogKey);
  }

  getBlogs() {
    var query: string = '/Blogs';
    console.log(query);
    this.fbBlogs = this.af.database.list(query, {}).map((_blogs) => {
      return _blogs.map((_blog) => {
        return _blog;
      })
    });
  }

  getBlogDetails(key: string) {
    var query: string = '/Blogs/' + key;
    console.log(query);
    this.fbBlogDetails = this.af.database.object(query);
  }

  addBlog(bTitle: string, bSTitle: string, bAuthor: string) {
    console.log("Add Blog!");
    var data: Object;
    var ckEditorContent = CKEDITOR.instances.ckEditor.getData();
    var date = new Date();
    data = {
      'Title': bTitle,
      'STitle': bSTitle,
      'Author': bAuthor,
      'Content': ckEditorContent,
      'PublishDate': date.toString()
    }
    //console.log(data);
    var query: string = '/Blogs';
    console.log(query);
    this.dashboardAlert('info', 'Processing.', true);
    this.fbNewBlog = this.af.database.list(query);
    const promise = this.fbNewBlog.push(data);
    promise
      .then(_ => this.dashboardAlert('success', 'New blog added successfully.', true))
      .catch(err => this.dashboardAlert('warning', 'Error occurred while addding blog.', true));
  }

  updateBlog(bTitle: string, bSTitle: string, bAuthor: string) {
    console.log("Update Blog!");
    var data: Object;
    var ckEditorContent = CKEDITOR.instances.ckEditor.getData();
    var date = new Date();
    data = {
      'Title': bTitle,
      'STitle': bSTitle,
      'Author': bAuthor,
      'Content': ckEditorContent,
      'PublishDate': date.toString()
    }
    //console.log(data);
    var query: string = '/Blogs';
    console.log(query);
    this.dashboardAlert('info', 'Processing.', true);
    const promise = this.fbBlogDetails.update(data);
    promise
      .then(_ => this.dashboardAlert('success', 'Blog updated successfully.', true))
      .catch(err => this.dashboardAlert('warning', 'Error occurred while updating blog.', true));
  }

  dashboardAlert(type, msg, status) {
    this.dAlertType = type;
    this.dAlertMsg = msg;
    this.dAlert = status;
    this.addNewBlogFlag = false;
    this.editBlogFlag = false;
  }

  closeAlert() {
    this.dAlert = false;
  }
}