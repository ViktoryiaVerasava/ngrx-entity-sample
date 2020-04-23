import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { User } from './models/user.model';
import * as UserActions from './user.actions';

export interface State extends EntityState<User> {
  selectedUserId: number | null;
  sortDirection: string | null;
  sortBy: string | null;
}

export function selectUserId(a: User): number {
  return a.id;
}

export function sortByName(a: User, b: User): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  selectedUserId: null,
  sortDirection: null,
  sortBy: null,
});

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

const userReducer = createReducer(
  initialState,

  on(UserActions.sortUsers, (state, { direction, property }) => {
    return { ...state, sortDirection: direction, sortBy: property };
  }),
  on(UserActions.loadUsersSuccess, (state, { users }) => {
    return adapter.addAll(users, state);
  }),
  on(UserActions.setCurrentUser, (state, { id }) => {
    return { ...state, selectedUserId: id };
  }),
  // not used:
  on(UserActions.addUser, (state, { user }) => {
    return adapter.addOne(user, state);
  }),
  on(UserActions.setUser, (state, { user }) => {
    return adapter.setOne(user, state);
  }),
  on(UserActions.upsertUser, (state, { user }) => {
    return adapter.upsertOne(user, state);
  }),
  on(UserActions.addUsers, (state, { users }) => {
    return adapter.addMany(users, state);
  }),
  on(UserActions.upsertUsers, (state, { users }) => {
    return adapter.upsertMany(users, state);
  }),
  on(UserActions.updateUser, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(UserActions.updateUsers, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(UserActions.mapUsers, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(UserActions.deleteUser, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(UserActions.deleteUsers, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(UserActions.deleteUsersByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(UserActions.clearUsers, (state) => {
    return adapter.removeAll({ ...state, selectedUserId: null });
  })
);

export const getSelectedUserId = (state: State) => state.selectedUserId;
export const getSortDirection = (state: State) => state.sortDirection;
export const getSortBy = (state: State) => state.sortBy;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectUserIds = selectIds;
export const selectUserEntities = selectEntities;
export const selectAllUsers = selectAll;
export const selectUserTotal = selectTotal;
