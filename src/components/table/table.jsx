import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {fetchUsers} from "../../store/api-actions";
import {MAX_TABLE_ROWS, SortType} from '../../const';
import {SortUsers, filterUsers} from '../../util';

import {getIfUsersLoaded, getUsers} from "../../store/reducers/data/selectors";
import {getTableType} from "../../store/reducers/work-process/selectors";

import TableRow from '../table-row/table-row';
import Search from "../search/search";
import FullUserInfo from "../full-user-info/full-user-info";
import AddUserForm from '../add-user-form/add-user-form';

const initialSliceData = {
  start: 0,
  fin: MAX_TABLE_ROWS
};

const initialSortData = {
  sort: SortType.NONE,
  isSortReversed: false
};

const SliceDataUpdate = {
  NEXT: (prevData) => ({
    start: prevData.fin,
    fin: prevData.fin + MAX_TABLE_ROWS
  }),
  PREV: (prevData) => ({
    start: prevData.start - MAX_TABLE_ROWS,
    fin: prevData.start
  })
};

const Table = () => {
  const dispatch = useDispatch();

  const tableType = useSelector(getTableType);
  const usersLoaded = useSelector(getIfUsersLoaded);
  const users = useSelector(getUsers);

  const [chosenUserId, setChosenUserId] = useState(null);
  const [searchLine, setSearchLine] = useState(null);
  const [sliceData, setSliceData] = useState(initialSliceData);
  const [sortInfo, setSort] = useState(initialSortData);
  const {sort, isSortReversed} = sortInfo;

  const usersToRender = useMemo(() => {
    const filteredUsers = searchLine ? filterUsers(users, searchLine) : users;
    const sortedUsers = SortUsers[sort](filteredUsers)
    const usersPreparedForSlice = isSortReversed ? sortedUsers.reverse() : sortedUsers;
    return usersPreparedForSlice.slice(sliceData.start, sliceData.fin);
  },
    [users, sort, sliceData, isSortReversed, searchLine]
  );

  const isNextStepButtonDisabled = sliceData.fin + MAX_TABLE_ROWS > users.length;
  const isPreviousStepButtonDisabled = sliceData.start - MAX_TABLE_ROWS < 0;

  useEffect(() => {
    dispatch(fetchUsers(tableType))
  }, [])

  const handleTableHeadersClick = (sortType) => () => {
    setSliceData(initialSliceData);

    setSort((prevSortInfo) => ({
      sort: sortType,
      isSortReversed: prevSortInfo.sort === sortType ? !prevSortInfo.isSortReversed : false
    }))
  };

  const handleAnotherPageButtonClick = (SliceDataUpdate) => () => setSliceData(SliceDataUpdate);

  const onFilter = (searchLine) => {
    setSliceData(initialSliceData);
    setSearchLine(searchLine);
  };

  const onUserInfoClose = () => setChosenUserId(null);

  if (!usersLoaded) {
    return <h2>LOADING</h2>;
  }

  return (
    <section>
      <AddUserForm/>
      <Search onFilter={onFilter}/>
      <table>
        <thead>
        <tr>
           <th onClick={handleTableHeadersClick(SortType.ID)}>id</th>
           <th onClick={handleTableHeadersClick(SortType.FIRST_NAME)}>firstName</th>
           <th onClick={handleTableHeadersClick(SortType.LAST_NAME)}>LastName</th>
           <th onClick={handleTableHeadersClick(SortType.EMAIL)}>email</th>
           <th>phone</th>
          </tr>
        </thead>
        <tbody>
          {
            usersToRender.map((value, i) => <TableRow  {...value} key={`${i}-user ${value.id}`} onRowClick={setChosenUserId}/>)
          }
        </tbody>
      </table>
      {
        users.length > MAX_TABLE_ROWS
        &&
        <>
          <button
            type="button"
            onClick={handleAnotherPageButtonClick(SliceDataUpdate.PREV)}
            disabled={isPreviousStepButtonDisabled}
          >
            Show previous
          </button>

          <button
            type="button"
            onClick={handleAnotherPageButtonClick(SliceDataUpdate.NEXT)}
            disabled={isNextStepButtonDisabled}
          >
            Show next
          </button>
        </>
      }
      {chosenUserId && <FullUserInfo {...users.find((value) => value.id === chosenUserId)} onUserInfoClose={onUserInfoClose}/>}
    </section>
  );
};

export default Table;
