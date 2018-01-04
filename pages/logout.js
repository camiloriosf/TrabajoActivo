import React, { Component } from 'react';
import Head from 'next/head';
import withRoot from '../lib/hoc/withRoot';
import LogoutContainer from '../components/auth/_logout';

class Logout extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>Trabajo Activo - Cerrar Sesión</title>
        </Head>
        <LogoutContainer />
      </div>
    );
  }
}

export default withRoot(Logout);
