import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { User } from './models/user.model';

export const selectUserState = createFeatureSelector<fromUser.State>('users');

export const selectUserIds = createSelector(
  selectUserState,
  fromUser.selectUserIds
);
export const selectUserEntities = createSelector(
  selectUserState,
  fromUser.selectUserEntities
);
export const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAllUsers
);
export const selectUserTotal = createSelector(
  selectUserState,
  fromUser.selectUserTotal
);
export const selectCurrentUserId = createSelector(
  selectUserState,
  fromUser.getSelectedUserId
);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userEntities[userId]
);

// sorting
export const selectSortDirection = createSelector(
  selectUserState,
  fromUser.getSortDirection
);
export const selectSortBy = createSelector(selectUserState, fromUser.getSortBy);

export const selectUsersWithSorting = createSelector(
  selectAllUsers,
  selectSortDirection,
  selectSortBy,
  (users: User[], direction: string, property: string) => {
    if (!direction || !property) {
      return users;
    }
    return users.sort((a, b) => {
      const first = direction === 'ASC' ? a : b;
      const second = direction === 'ASC' ? b : a;
      return first[property].localeCompare(second[property]);
    });
  }
);
