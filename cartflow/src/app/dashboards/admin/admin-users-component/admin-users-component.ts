import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-users-component',
  imports: [CommonModule],
  templateUrl: './admin-users-component.html',
  styleUrl: './admin-users-component.scss',
})
export class AdminUsersComponent implements OnInit {
date!: number;
isLoading = false;
users: User[] =[];
baseUrl = environment.apiUrl;

constructor(private userSvc: UserService){};

getUsers(){
  this.isLoading = true;

  this.userSvc.getUsers().subscribe({
    next: (res) =>{this.users = res;},
    error: (err) =>{console.log(err)},
    complete: () => this.isLoading = false
  })
}

ngOnInit(): void {
  this.date = Date.now();
  this.getUsers();
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

getDate(){
  return this.date;
}
}
