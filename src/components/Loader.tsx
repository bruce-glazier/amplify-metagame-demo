import React from 'react';
import './Loader.css';

type Props = {
  isLoading: boolean;
};

export function Loader(props: Props) {
  return (
    <div
      data-testId="full-page-loader"
      className={props.isLoading ? 'loading' : 'hidden'}
    >
      <div className={props.isLoading ? 'loading-animation' : 'hidden'}></div>
    </div>
  );
}
