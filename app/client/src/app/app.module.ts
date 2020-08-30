import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { PropertyService } from './services/property.services';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { MatIconModule, MatTabsModule, MatSnackBarModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const appRoutes: Routes = [
  {
      path        : 'change',
      loadChildren: './property/property-module.module#PropertyModule'
  },
  {
    path        : '**',
    redirectTo: 'change'
}
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule, // <============ (Perform http requests with this module)
    NgHttpLoaderModule, // <============
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PropertyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
