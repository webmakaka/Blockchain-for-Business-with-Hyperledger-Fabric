 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyComponent } from './property/property.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
    path: 'property',
    component: PropertyComponent
  },
  {
    path      : '**',
    redirectTo: 'property'
}
];

@NgModule({
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [PropertyComponent]
})
export class PropertyModule { }
