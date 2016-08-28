import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { PostComponent } from './post.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { Routes, RouterModule } from '@angular/router';

const weblogRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'post', component: PostComponent
  },
  { 
    path: 'post/...', component: PostComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: '*', component: HomeComponent
  }
];

export const weblogRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(weblogRoutes);
