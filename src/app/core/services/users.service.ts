import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dummyUsers: string[] = ['John', 'Jane', 'Doe', 'Smith', 'Doe', 'Emily', 'Michael'];

  private usersSubject = new BehaviorSubject<string[]>(this.dummyUsers);

  users$: Observable<string[]> = this.usersSubject.asObservable();

  addUser(name: string): void {
    const currentUsers = this.usersSubject.getValue();
    this.usersSubject.next([...currentUsers, name]); 
  }

  removeUser(name: string): void {
    const currentUsers = this.usersSubject.getValue();
    this.usersSubject.next(currentUsers.filter((user) => user !== name)); 
  }

  resetUsers(): void {
    this.usersSubject.next([...this.dummyUsers]);
  }
}
