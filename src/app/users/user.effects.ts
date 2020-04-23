import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { loadUsers, loadUsersSuccess } from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.loadAll().pipe(
          map(
            (users) => ({
              type: loadUsersSuccess.type,
              users,
            }),
            catchError(() => EMPTY)
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private userService: UserService) {}
}
