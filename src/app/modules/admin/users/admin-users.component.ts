import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type UserStatus = 'ACTIVE' | 'INACTIVE';
type UserRole = 'ADMIN' | 'SELLER' | 'BUYER';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  users: AdminUser[] = [
    {
      id: 1,
      name: 'Aditi Sharma',
      email: 'aditi@vedic.com',
      role: 'BUYER',
      status: 'ACTIVE',
      createdAt: '2025-02-12'
    },
    {
      id: 2,
      name: 'Sanjay Kapur',
      email: 'sanjay@vedic.com',
      role: 'SELLER',
      status: 'INACTIVE',
      createdAt: '2025-01-27'
    },
    {
      id: 3,
      name: 'Meera Rao',
      email: 'meera@vedic.com',
      role: 'BUYER',
      status: 'ACTIVE',
      createdAt: '2025-02-20'
    },
    {
      id: 4,
      name: 'Admin V',
      email: 'admin@vedic.com',
      role: 'ADMIN',
      status: 'ACTIVE',
      createdAt: '2024-12-01'
    }
  ];

  selectedUser: AdminUser | null = null;
  draftUser: AdminUser | null = null;

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
