import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
// supporting imports
import Router from 'next/router';
// local imports
import { app } from '../lib/google/firebase';

const AppWrapper = props => props.children;

function withoutAuth(BaseComponent) {
  class WithoutAuth extends Component {
    componentDidMount = async () => {
      await app.auth().onAuthStateChanged((user) => {
        if (user) {
          Router.push('/user');
        }
      });
    }

    render() {
      return (
        <AppWrapper>
          <BaseComponent {...this.props} />
        </AppWrapper>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithoutAuth.displayName = wrapDisplayName(BaseComponent, 'withoutAuth');
  }

  return WithoutAuth;
}

export default withoutAuth;
