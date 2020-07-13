import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent, EmployeeDialog } from './employees/employees.component';
import { AngularMaterialsModule } from '../shared/angular-materials.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeDialog
  ],
  imports: [
    CommonModule,
    AngularMaterialsModule,
    HttpClientModule,
    FormsModule
 
  ],
  exports: [ 
    EmployeesComponent
  ]
})
export class EmployeesModule { }
