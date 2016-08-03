import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { WeblogAppComponent, environment } from './app/';
import { Title } from '@angular/platform-browser';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(WeblogAppComponent,[
  Title,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyAeRUV37J7ELu5m5bvV5WqRGpgZD9Vx9J4",
    authDomain: "weblog-41d14.firebaseapp.com",
    databaseURL: "https://weblog-41d14.firebaseio.com",
    storageBucket: "weblog-41d14.appspot.com",
  })
]);
