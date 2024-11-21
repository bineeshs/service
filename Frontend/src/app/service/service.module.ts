import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';


import { ServiceRoutingModule } from './service-routing.module';
import { AddServiceComponent } from './add-service/add-service.component';
import { FollowUpServiceComponent } from './follow-up-service/follow-up-service.component';







@NgModule({
  declarations: [
    AddServiceComponent,
    FollowUpServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2SmartTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    SelectDropDownModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule,
    MatNativeDateModule

  
  ]
})
export class ServiceModule { }
