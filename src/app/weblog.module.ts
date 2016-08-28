import { NgModule }     from '@angular/core';
import { BrowserModule, Title }        from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AngularFireModule }    from 'angularfire2';
import { WeblogAppComponent }   from './weblog.component';
import { routing, weblogRoutingProviders }  from './weblog.routing';
import { HomeComponent }    from './home.component';
import { LoginComponent }   from './login.component';
import { DashboardComponent }   from './dashboard.component';
import { PostComponent }    from './post.component';
import { AboutComponent }   from './about.component';
import { ContactComponent } from './contact.component';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyAeRUV37J7ELu5m5bvV5WqRGpgZD9Vx9J4",
    authDomain: "weblog-41d14.firebaseapp.com",
    databaseURL: "https://weblog-41d14.firebaseio.com",
    storageBucket: "weblog-41d14.appspot.com"
};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [
        weblogRoutingProviders,
        Title
    ],
    declarations: [
        WeblogAppComponent,
        HomeComponent,
        LoginComponent,
        DashboardComponent,
        PostComponent,
        AboutComponent,
        ContactComponent
    ],
    bootstrap: [WeblogAppComponent]
})

export class WeblogModule {
}