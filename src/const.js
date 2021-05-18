export const TableType = {
  BIG: `BIG`,
  SMALL: `SMALL`
}

export const ApiRoutes = {
  [TableType.SMALL]: `/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`,
  [TableType.BIG]: `/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
};
