import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

const Users = gql`
  query AllUsers($first: Int!, $orderBy: UserOrderBy) {
    allUsers(first: $first, orderBy: $orderBy) {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  loadAll(): Observable<User[]> {
    return this.apollo
      .watchQuery<any>({
        query: Users,
        variables: {
          first: 20,
          orderBy: 'createdAt_ASC'
        },
      })
      .valueChanges.pipe(
        map(({ data: { allUsers } }) => allUsers)
      ) as Observable<User[]>;
  }
}
