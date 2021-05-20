import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {fetchUsers} from "../../store/api-actions";
import {MAX_TABLE_ROWS, SortType, TableType} from '../../const';
import {SortUsers, filterUsers} from '../../util';
import {changeTableType} from "../../store/action-creators";

import {getIfUsersLoaded, getUsers, getUsersFetchErrorStatus} from "../../store/reducers/data/selectors";
import {getTableType} from "../../store/reducers/work-process/selectors";

import TableRow from '../table-row/table-row';
import Search from "../search/search";
import FullUserInfo from "../full-user-info/full-user-info";
import AddUserForm from '../add-user-form/add-user-form';
import Loading from "../loading/loading";
import TableError from "./table-error";

import style from './table.scss';

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
  const ifUsersFetchFailed = useSelector(getUsersFetchErrorStatus);

  const [chosenUserId, setChosenUserId] = useState(null);
  const [searchLine, setSearchLine] = useState(null);
  const [sliceData, setSliceData] = useState(initialSliceData);
  const [sortInfo, setSort] = useState(initialSortData);
  const {sort, isSortReversed} = sortInfo;

  const filteredUsers = useMemo(() =>
    searchLine ? filterUsers(users, searchLine) : users,
    [searchLine, users]
  );

  const usersToRender = useMemo(() => {
    const sortedUsers = SortUsers[sort](filteredUsers)
    const usersPreparedForSlice = isSortReversed ? sortedUsers.reverse() : sortedUsers;
    return usersPreparedForSlice.slice(sliceData.start, sliceData.fin);
  },
    [sort, sliceData, isSortReversed, filteredUsers]
  );

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

  const handleCloseTableButtonClick = () => dispatch(changeTableType(TableType.NONE))

  const onFilter = (searchLine) => {
    setSliceData(initialSliceData);
    setSearchLine(searchLine);
  };

  const onUserInfoClose = () => setChosenUserId(null);

  const isNextStepButtonDisabled = sliceData.fin >= filteredUsers.length;
  const isPreviousStepButtonDisabled = sliceData.start - MAX_TABLE_ROWS < 0;

  if (ifUsersFetchFailed) {
    return <TableError onCloseButtonClick={handleCloseTableButtonClick}/>;
  }

  if (!usersLoaded) {
    return <Loading/>;
  }

  return (
    <div className={style.container}>
      <div className={style.widthWrapper}>
        <AddUserForm/>
        <Search onFilter={onFilter}/>
        <table className={style.table}>
          <thead>
          <tr>
            <th onClick={handleTableHeadersClick(SortType.ID)}>id</th>
            <th onClick={handleTableHeadersClick(SortType.FIRST_NAME)}>FirstName</th>
            <th onClick={handleTableHeadersClick(SortType.LAST_NAME)}>LastName</th>
            <th onClick={handleTableHeadersClick(SortType.EMAIL)}>Email</th>
            <th>Phone</th>
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
          <div className={style.navButtons}>
           <button
             type="button"
             className={style.navButton}
             onClick={handleAnotherPageButtonClick(SliceDataUpdate.PREV)}
             disabled={isPreviousStepButtonDisabled}
            >
             &lt;-- Show previous
            </button>

            <button
              type="button"
              className={style.navButton}
              onClick={handleAnotherPageButtonClick(SliceDataUpdate.NEXT)}
              disabled={isNextStepButtonDisabled}
            >
              Show next --&gt;
            </button>
          </div>
        }
        {chosenUserId && <FullUserInfo {...users.find((value) => value.id === chosenUserId)} onUserInfoClose={onUserInfoClose}/>}
      </div>
    </div>
  );
};

export default Table;
