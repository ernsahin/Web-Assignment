import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User } from '../types';
import { mockUsers, nextUserId } from '../data/mock-users';

@Injectable()
export class UsersService {
  private users: User[] = [...mockUsers];
  private nextId = nextUserId;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  create(userData: Omit<User, 'id'>): User {
    const existingEmail = this.users.find(
      (user) => user.email === userData.email,
    );
    if (existingEmail) {
      throw new ConflictException(`Email ${userData.email} is already in use`);
    }

    const existingUsername = this.users.find(
      (user) => user.username === userData.username,
    );
    if (existingUsername) {
      throw new ConflictException(
        `Username ${userData.username} is already taken`,
      );
    }

    const newUser: User = {
      id: this.nextId++,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, userData: Partial<User>): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = { ...this.users[userIndex], ...userData };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: number): { message: string } {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
    return { message: `User with ID ${id} deleted successfully` };
  }
}
