import React, { Component } from 'react';
import Head from 'next/head';
import ReactGA from 'react-ga';
import withRoot from '../lib/hoc/withRoot';
import LogoutContainer from '../components/auth/_logout';

class Logout extends Component {
  componentDidMount = () => {
    ReactGA.initialize('UA-100581684-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  render() {
    return (
      <div>
        <Head>
          <title>TrabajoActivo - Cerrar Sesión</title>
        </Head>
        <LogoutContainer />
      </div>
    );
  }
}

export default withRoot(Logout);
