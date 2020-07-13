import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeesService } from '../employees.service';
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Employee {
  name: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employeesData: any = [];
  displayedColumns = ['name', 'email', 'phone', 'website', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  myFilterValue = '';
  selectedRowIndex: number;

  constructor(
    private employeesService: EmployeesService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : '';
    // return filterValue;
  }
 
  resetFilter(event: Event) {
    this.myFilterValue = '';
    this.dataSource.filter = '';
  }

  selectRow(row) {
    console.log("Selected: ", row);
  }

  openDialog(row): void {
    // console.log("Open dialog: ", row);
    const dialogRef = this.dialog.open(EmployeeDialog, {
      width: '250px',
      data: {id: row.id, name: row.name, email: row.email, phone: row.phone, website: row.website}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed.');
    });
  }

  getData() {
    this.employeesService.getEmployees()
    .subscribe(
      data => {
        this.employeesData = data;
        // console.log("Data: ", this.employeesData);
        this.dataSource = new MatTableDataSource<Employee>(this.employeesData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.myFilterValue = '';
        this.dataSource.filter = this.myFilterValue ? this.myFilterValue.trim().toLowerCase() : '';  
      },
      error => console.log("Error: ", error),
      oncomplete => console.log("Completed data request.")
    )
  }
}

@Component({
  selector: 'employee-dialog',
  templateUrl: 'employee-dialog.html',
})
export class EmployeeDialog {

  constructor(
    private employeesService: EmployeesService,
    public dialogRef: MatDialogRef<EmployeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {}

  updateEmployee(data) {
    console.log("Updating employee:");
    console.log(data);
    this.employeesService.putEmployee(data.id)
    .subscribe(
      res => console.log("Response from server: ", res),
      error => console.log("Error: ", error)
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
