import {SortType, userFields} from '../const';

export const SortUsers = {
  [SortType.NONE]: (users) => users,
  [SortType.ID]: (users) => users.slice().sort((prev, curr) => prev.id - curr.id),
  [SortType.FIRST_NAME]: (users) => users.slice().sort((prev, curr) => prev.firstName.localeCompare(curr.firstName)),
  [SortType.LAST_NAME]: (users) => users.slice().sort((prev, curr) => prev.lastName.localeCompare(curr.lastName)),
  [SortType.EMAIL]: (users) => users.slice().sort((prev, curr) => prev.email.localeCompare(curr.email))
};

export const filterUsers = (users, searchLine) => users.filter(
  (user) => userFields
    .map((field) => String(user[field]).includes(searchLine))
    .some(isFound => isFound)
  )
