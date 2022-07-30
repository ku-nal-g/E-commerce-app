import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usersList: any = [];
  editIndex!: number;
  deleteIndex!: number;
  deleteUserName: string = '';
  editUserGroup!: FormGroup;
  addUserGroup!: FormGroup;
  userRole = 'admin';
  today!:Date;
  latitude!:number;
  longitude!:number;
  isSelected:string = 'open';

  displayedColumns: string[] = ['name', 'email', 'age', 'number', 'role', 'address', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usersData: UserDataService, private auth: AuthService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.usersData.getCustomersData().subscribe((res) => {
      this.usersList = res;
      this.dataSource = new MatTableDataSource(this.usersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error) => {
        console.log("error occured");
      })
    this.createEditForm();
    this.createAddUserForm()
    setInterval(()=>{
      this.today = new Date();
    },1000)
    navigator.geolocation.getCurrentPosition((position)=>{
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    })
  }

  createEditForm() {
    this.editUserGroup = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      role: ['', [Validators.required]],
      address: ['', [Validators.required]]
    })
  }

  //getter methods for editform group
  get name() {
    return this.editUserGroup.get('name');
  }
  get email() {
    return this.editUserGroup.get('email');
  }
  get age() {
    return this.editUserGroup.get('age');
  }
  get phone() {
    return this.editUserGroup.get('phone');
  }
  get role() {
    return this.editUserGroup.get('role');
  }
  get address() {
    return this.editUserGroup.get('address');
  }

  createAddUserForm() {
    this.addUserGroup = this.fb.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      userAge: ['', [Validators.required]],
      userPhone: ['', [Validators.required]],
      userRole: ['', [Validators.required]],
      userAddress: ['', [Validators.required]]
    })
  }

  // getter methods for adduser group
  get userName() {
    return this.addUserGroup.get('userName');
  }
  get userEmail() {
    return this.addUserGroup.get('userEmail');
  }
  get userAge() {
    return this.addUserGroup.get('userAge');
  }
  get userPhone() {
    return this.addUserGroup.get('userPhone');
  }
  get roleInfo() {
    return this.addUserGroup.get('userRole');
  }
  get userAddress() {
    return this.addUserGroup.get('userAddress');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getColor(role: string) {
    return role == 'Admin' ? 'lightgreen' : role == 'Guest' ? 'lightblue' : 'tomato';
  }
  getEditIndex(item: any) {
    let index = this.usersList.findIndex((obj: { id: any; }) => {
      return obj.id == item.id;
    })
    this.editIndex = index;
    this.patchEditFormValue();
  }
  patchEditFormValue() {
    this.editUserGroup.patchValue({
      name: this.usersList[this.editIndex].name,
      email: this.usersList[this.editIndex].email,
      age: this.usersList[this.editIndex].age,
      phone: this.usersList[this.editIndex].number,
      role: this.usersList[this.editIndex].role,
      address: this.usersList[this.editIndex].address,
    })
  }
  updateUser() {
    this.usersList[this.editIndex].name = this.editUserGroup.value.name;
    this.usersList[this.editIndex].email = this.editUserGroup.value.email;
    this.usersList[this.editIndex].age = this.editUserGroup.value.age;
    this.usersList[this.editIndex].number = this.editUserGroup.value.phone;
    this.usersList[this.editIndex].role = this.editUserGroup.value.role;
    this.usersList[this.editIndex].address = this.editUserGroup.value.address;
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.toastr.success("User Updated successfully");
  }
  getDeleteIndex(item: any) {
    this.deleteUserName = item.name;
    let index = this.usersList.findIndex((obj: { id: any; }) => {
      return obj.id == item.id;
    })
    this.deleteIndex = index;
  }
  deleteUser() {
    this.usersList.splice(this.deleteIndex, 1);
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.toastr.success("User Deleted Successfully");
  }

  addUser() {
    let reqObj = {
      name: this.addUserGroup.value.userName,
      email: this.addUserGroup.value.userEmail,
      age: this.addUserGroup.value.userAge,
      number: this.addUserGroup.value.userPhone,
      role: this.addUserGroup.value.userRole,
      address: this.addUserGroup.value.userAddress,
    }
    this.usersList.push(reqObj);
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.toastr.success("User Added successfully");
  }
  logout(){
    this.auth.logout();
    this.toastr.success("Logged out successfully");
  }
}
