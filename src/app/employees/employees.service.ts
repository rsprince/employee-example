import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  dataUrl: string = "assets/data.json";
  putUrl: string = 'someurl.api.com';
  data: any;

  constructor(private http: HttpClient ) { }

  // list all employees
  getEmployees() {
    this.data = this.http.get(this.dataUrl);
    return this.data;
  }

  // update one employee
  putEmployee(employee) {
    console.log("Updating employee to server...");
    console.log(employee);
    return this.http.put(this.putUrl + '/' + employee.id, employee);
  }
}
