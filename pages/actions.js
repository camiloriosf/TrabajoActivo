import React, { Component } from 'react';
import withRoot from '../lib/hoc/withRoot';
import ActionsContainer from '../components/auth/_actions';

class Actions extends Component {
  render() {
    return (
      <div>
        <ActionsContainer url={this.props.url} />
      </div>
    );
  }
}

export default withRoot(Actions);
