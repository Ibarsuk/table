import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {fetchUsers} from "../../store/api-actions";
import {MAX_TABLE_ROWS} from '../../const';

import {getIfUsersLoaded, getUsers} from "../../store/reducers/data/selectors";
import {getTableType} from "../../store/reducers/work-process/selectors";

import TableRow from '../table-row/table-row';

const Table = () => {
  const dispatch = useDispatch();

  const tableType = useSelector(getTableType);
  const usersLoaded = useSelector(getIfUsersLoaded);
  const users = useSelector(getUsers);

  const [lastRow, setLastRow] = useState(MAX_TABLE_ROWS)

  useEffect(() => {
    dispatch(fetchUsers(tableType))
  }, [])

  if (!usersLoaded) {
    return <h2>LOADING</h2>;
  }

  return (
    <section>
      <table>
        <tbody>
          <tr>
           <th>id</th>
           <th>firstName</th>
           <th>LastName</th>
           <th>email</th>
           <th>phone</th>
          </tr>
          {
            users.slice(0, lastRow).map((value) => <TableRow  {...value} key={`user ${value.id}`}/>)
          }
        </tbody>
      </table>
    </section>
  );
};

export default Table;
