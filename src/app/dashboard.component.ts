import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/RX';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from '@angular/forms';

declare var jQuery: any;
declare var CKEDITOR: any;

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  providers: [LoginComponent]
})

export class DashboardComponent implements OnInit, AfterViewInit {

  pageTitle: string = "Dashboard";

  fbBlogs: Observable<any[]>;
  fbBlogDetails: FirebaseObjectObservable<any>;
  fbNewBlog: FirebaseListObservable<any>;

  dAlert: boolean;
  dAlertMsg: string;
  dAlertType: string;

  timerCkeditor: any;

  addNewBlogFlag: boolean;
  editBlogFlag: boolean;

  dashboardForm: FormGroup;

  constructor(
    private home: HomeComponent,
    public af: AngularFire,
    public loginUser: LoginComponent,
    public router: Router,
    private titleService: Title,
    private formBuilder: FormBuilder) {

    //Set page title
    this.titleService.setTitle(this.home.appTitle + " | " + this.pageTitle);

    //get af auth status
    af.auth
      .do(v => this.dashboardLogin(v))
      .subscribe(user => this.dashboardLogin(user))

    //dashboard form
    this.dashboardForm = formBuilder.group({
      Title: formBuilder.control(null),
      STitle: formBuilder.control(null),
      Author: formBuilder.control(null),
      Content: formBuilder.control(null)
    });
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

  addupdateBlog(blogFlag) {
    var data: Object;
    var ckEditorContent = CKEDITOR.instances.ckEditor.getData();
    var date = new Date();
    var fDate = date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
    data = {
      'Title': this.dashboardForm.value.Title,
      'STitle': this.dashboardForm.value.STitle,
      'Author': this.dashboardForm.value.Author,
      'Content': ckEditorContent,
      'PublishDate': fDate
    }
    //console.log(data);
    var query: string = '/Blogs';
    console.log(query);
    this.dashboardAlert('info', 'Processing.', true);
    if (blogFlag) {
      console.log("Add Blog!");
      this.fbNewBlog = this.af.database.list(query);
      const promise = this.fbNewBlog.push(data);
      promise
        .then(_ => this.dashboardAlert('success', 'New blog added successfully.', true))
        .catch(err => this.dashboardAlert('warning', 'Error occurred while addding blog.', true));
    }
    else {
      console.log("Update Blog!");
      const promise = this.fbBlogDetails.update(data);
      promise
        .then(_ => this.dashboardAlert('success', 'Blog updated successfully.', true))
        .catch(err => this.dashboardAlert('warning', 'Error occurred while updating blog.', true));
    }
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