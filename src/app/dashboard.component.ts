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
    //else
    //selectCategory
    //this.getCategory();
  }

  loadCKEditor(details: string) {
    clearTimeout(this.timerCkeditor);
    if (CKEDITOR.instances['ckEditor'] == undefined) {
      this.timerCkeditor = setTimeout(() => this.setCKEditorContent(details), 1000);
    }
  }

  setCKEditorContent(details: string) {
    if (CKEDITOR.instances['ckEditor'] == undefined)
      CKEDITOR.replace('ckEditor');
  }

  dashboardLogout() {
    this.loginUser.logoutUser();
  }

  newBlog() {
    console.log('Add new blog!');
    this.addNewBlogFlag = true;
    this.editBlogFlag = false;
  }
  editBlog() {
    console.log('Edit blog!');
    this.editBlogFlag = true;
    this.addNewBlogFlag = false;
  }

  dashboardalert(type, msg, status) {
    this.dAlertType = type;
    this.dAlertMsg = msg;
    this.dAlert = status;
  }

  closeAlert() {
    this.dAlert = false;
  }
}