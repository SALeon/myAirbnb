import React from 'react';
import { Redirect } from 'react-router-dom';

export class UserGuard extends React.Component {
  render() {
    const { isAllowed, isFetching } = this.props;

    if (isAllowed && !isFetching) {
      return this.props.children;
    } if (!isAllowed && !isFetching) {
      return <Redirect to={{ pathname: '/rentals' }} />;
    }
    return <h1> Loading... </h1>;
  }
}
