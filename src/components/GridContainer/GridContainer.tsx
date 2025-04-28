import React from 'react';
import css from './GridContainer.module.css';

type Props = {
  children: React.ReactNode;
};

const GridContainer = ({ children }: Props) => (
  <div className={css.GridContainer}>{children}</div>
);

export default GridContainer;
