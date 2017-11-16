import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
// supporting imports
import Router from 'next/router';
// local imports
import { app } from '../lib/google/firebase';

const AppWrapper = props => props.children;

function withAuth(BaseComponent) {
  class WithAuth extends Component {
    state = {
      user: null,
      loading: true,
    };

    componentDidMount = async () => {
      await app.auth().onAuthStateChanged((user) => {
        if (user) {
          this.handleChange(user);
        } else Router.push('/');
      });
    }

    handleChange = (user) => {
      this.setState({ user, loading: false });
    }

    render() {
      return (
        <AppWrapper>
          {
            this.state.loading
            ? 'loading'
            : <BaseComponent {...this.props} user={this.state.user} />
          }
        </AppWrapper>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithAuth.displayName = wrapDisplayName(BaseComponent, 'withAuth');
  }

  return WithAuth;
}

export default withAuth;
