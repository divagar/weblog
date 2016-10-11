import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { PostComponent } from './post.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';

declare var jQuery: any;

@Component({
  selector: 'weblog',
  templateUrl: 'weblog.component.html',
  styleUrls: ['weblog.component.css']
})

export class WeblogAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    try {
      //click event for navbar
      jQuery(document).on('click', '.navbar-collapse.in', function (e) {
        if (jQuery(e.target).is('a') && jQuery(e.target).attr('class') != 'dropdown-toggle') {
          jQuery(this).collapse('hide');
        }
      });
    }
    catch (e) {
      console.log("weblog ngAfterViewInit: error - " + e);
    }
  }
}