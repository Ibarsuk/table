import {filterUsers} from './util';

it(`Users filter works correctly`, () => {
  let filteredUsers;
  let users;

  users = [{email: `Bill@m.com`}, {email: `Ann@y.ru`}, {email: `Charlie@bb.io`}];

  expect(filterUsers(users, `@`)).toEqual(users);

  users = [{email: `Bill@m.com`, id: `322`}, {email: `Ann@y.ru`}, {email: `Charlie@bb.io`}];
  filteredUsers = [{email: `Bill@m.com`, id: `322`}];

  expect(filterUsers(users, `22`)).toEqual(filteredUsers);
  expect(filterUsers(users, `!@)&??//`)).toEqual([]);
});
