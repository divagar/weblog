import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { WeblogAppComponent } from '../app/weblog.component';

beforeEachProviders(() => [WeblogAppComponent]);

describe('App: Weblog', () => {
  it('should create the app',
      inject([WeblogAppComponent], (app: WeblogAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'weblog works!\'',
      inject([WeblogAppComponent], (app: WeblogAppComponent) => {
    expect(app.title).toEqual('weblog works!');
  }));
});
