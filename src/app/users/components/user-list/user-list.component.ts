import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Store, select } from '@ngrx/store';

import * as fromUsers from '../../';
import { loadUsers, setCurrentUser, sortUsers } from '../../user.actions';

@Component({
  selector: 'vv-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  total$: Observable<number>;
  currentUserId$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {}
  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.users$ = this.store.pipe(select(fromUsers.selectUsersWithSorting));
    this.total$ = this.store.pipe(select(fromUsers.selectUserTotal));
    this.currentUserId$ = this.store.pipe(
      select(fromUsers.selectCurrentUserId)
    );
  }

  selectUser(id: number): void {
    this.store.dispatch(setCurrentUser({ id }));
  }

  sortUsers(direction: string, property: string): void {
    this.store.dispatch(sortUsers({ direction, property }));
  }
}
