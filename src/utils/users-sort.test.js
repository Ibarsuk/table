import {SortUsers} from './util';
import {SortType} from '../const';

describe(`Users sort function works correctly`, () => {
  it(`Default sort works correctly`, () => {
    const users = [{id: 342}, {id: 1345}, {id: 0}]

    expect(SortUsers[SortType.NONE](users)).toEqual(users);
  });

  it(`Sort by id works correctly`, () => {
    const users = [{id: 342}, {id: 1345}, {id: 0}];
    const sortedUsers = [{id: 0}, {id: 342}, {id: 1345}];

    expect(SortUsers[SortType.ID](users)).toEqual(sortedUsers);
  });

  it(`Sort by first name works correctly`, () => {
    const users = [{firstName: `Bill`}, {firstName: `Ann`}, {firstName: `Charlie`}];
    const sortedUsers = [{firstName: `Ann`}, {firstName: `Bill`}, {firstName: `Charlie`}];

    expect(SortUsers[SortType.FIRST_NAME](users)).toEqual(sortedUsers);
  });

  it(`Sort by last name works correctly`, () => {
    const users = [{lastName: `Bill`}, {lastName: `Ann`}, {lastName: `Charlie`}];
    const sortedUsers = [{lastName: `Ann`}, {lastName: `Bill`}, {lastName: `Charlie`}];

    expect(SortUsers[SortType.LAST_NAME](users)).toEqual(sortedUsers);
  });

  it(`Sort by email works correctly`, () => {
    const users = [{email: `Bill@m.com`}, {email: `Ann@y.ru`}, {email: `Charlie@bb.io`}];
    const sortedUsers = [{email: `Ann@y.ru`}, {email: `Bill@m.com`}, {email: `Charlie@bb.io`}];

    expect(SortUsers[SortType.EMAIL](users)).toEqual(sortedUsers);
  });
});
