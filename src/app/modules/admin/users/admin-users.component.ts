import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminUser } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: AdminUser[] = [];

  selectedUser: AdminUser | null = null;
  draftUser: AdminUser | null = null;

  constructor(private adminData: AdminDataService) {}

  ngOnInit() {
    this.adminData.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  selectUser(user: AdminUser) {
    this.selectedUser = user;
    this.draftUser = { ...user };
  }

  saveUser() {
    if (!this.draftUser) return;
    this.users = this.users.map((user) =>
      user.id === this.draftUser?.id ? { ...this.draftUser } : user
    );
    this.selectedUser = null;
    this.draftUser = null;
  }

  toggleStatus() {
    if (!this.draftUser) return;
    this.draftUser.status = this.draftUser.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
  }

  closeCard() {
    this.selectedUser = null;
    this.draftUser = null;
  }
}
