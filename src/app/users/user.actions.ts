import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, Predicate } from '@ngrx/entity';

import { User } from './models/user.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const setCurrentUser = createAction(
  '[User] Set Current User',
  props<{ id: number }>()
);
export const sortUsers = createAction(
  '[User] Sort',
  props<{ direction: string; property: string }>()
);

// not used:
export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const setUser = createAction('[User] Set User', props<{ user: User }>());
export const upsertUser = createAction(
  '[User] Upsert User',
  props<{ user: User }>()
);
export const addUsers = createAction(
  '[User] Add Users',
  props<{ users: User[] }>()
);
export const upsertUsers = createAction(
  '[User] Upsert Users',
  props<{ users: User[] }>()
);
export const updateUser = createAction(
  '[User] Update User',
  props<{ update: Update<User> }>()
);
export const updateUsers = createAction(
  '[User] Update Users',
  props<{ updates: Update<User>[] }>()
);
export const mapUsers = createAction(
  '[User] Map Users',
  props<{ entityMap: EntityMap<User> }>()
);
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: string }>()
);
export const deleteUsers = createAction(
  '[User] Delete Users',
  props<{ ids: string[] }>()
);
export const deleteUsersByPredicate = createAction(
  '[User] Delete Users By Predicate',
  props<{ predicate: Predicate<User> }>()
);
export const clearUsers = createAction('[User] Clear Users');
