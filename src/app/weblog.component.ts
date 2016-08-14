import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { PostComponent } from './post.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'weblog',
  templateUrl: 'weblog.component.html',
  styleUrls: ['weblog.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {
    path: '/login', component: LoginComponent
  },
  {
    path: '/dashboard', component: DashboardComponent
  },
  {
    path: '/post', component: PostComponent
  },
  { 
    path: 'post/:id', component: PostComponent
  },
  {
    path: '/about', component: AboutComponent
  },
  {
    path: '/contact', component: ContactComponent
  },
  {
    path: '/home', component: HomeComponent
  },
  {
    path: '/', component: HomeComponent
  },
  {
    path: '*', component: HomeComponent
  }
])

export class WeblogAppComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}