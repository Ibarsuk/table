import React from "react";

import style from './loading.scss';

const Loading = () => (
  <div className={style.wrapper}>
    <div className={style.loading}><span>Loading&#8230;</span></div>
  </div>
);

export default Loading;
