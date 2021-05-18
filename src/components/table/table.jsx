import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {fetchUsers} from "../../store/api-actions";
import {MAX_TABLE_ROWS, SortType} from '../../const';

import {getIfUsersLoaded, getUsers} from "../../store/reducers/data/selectors";
import {getTableType} from "../../store/reducers/work-process/selectors";

import TableRow from '../table-row/table-row';

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

const Sort = {
  [SortType.NONE]: (users) => users,
  [SortType.ID]: (users) => users.slice().sort((prev, curr) => prev.id - curr.id),
  [SortType.FIRST_NAME]: (users) => users.slice().sort((prev, curr) => prev.firstName.localeCompare(curr.firstName)),
  [SortType.LAST_NAME]: (users) => users.slice().sort((prev, curr) => prev.lastName.localeCompare(curr.lastName)),
  [SortType.EMAIL]: (users) => users.slice().sort((prev, curr) => prev.email.localeCompare(curr.email))
};

const Table = () => {
  const dispatch = useDispatch();

  const tableType = useSelector(getTableType);
  const usersLoaded = useSelector(getIfUsersLoaded);
  const users = useSelector(getUsers);

  const [sliceData, setSliceData] = useState(initialSliceData);
  const [sortInfo, setSort] = useState(initialSortData);
  const {sort, isSortReversed} = sortInfo;

  const usersToRender = useMemo(() => {
    const sortedUsers = Sort[sort](users)
    const usersPreparedForSlice = isSortReversed ? sortedUsers.reverse() : sortedUsers;
    return usersPreparedForSlice.slice(sliceData.start, sliceData.fin);
  },
    [users, sort, sliceData, isSortReversed]
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

  if (!usersLoaded) {
    return <h2>LOADING</h2>;
  }

  return (
    <section>
      <table>
        <tbody>
          <tr>
           <th onClick={handleTableHeadersClick(SortType.ID)}>id</th>
           <th onClick={handleTableHeadersClick(SortType.FIRST_NAME)}>firstName</th>
           <th onClick={handleTableHeadersClick(SortType.LAST_NAME)}>LastName</th>
           <th onClick={handleTableHeadersClick(SortType.EMAIL)}>email</th>
           <th>phone</th>
          </tr>
          {
            usersToRender.map((value, i) => <TableRow  {...value} key={`${i}-user ${value.id}`}/>)
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
    </section>
  );
};

export default Table;
