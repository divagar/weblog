import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { PostComponent } from './post.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';

@Component({
  moduleId: module.id,
  selector: 'weblog',
  templateUrl: 'weblog.component.html',
  styleUrls: ['weblog.component.css']
})

export class WeblogAppComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}