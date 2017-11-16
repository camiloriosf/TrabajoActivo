import React, { Component } from 'react';
import withRoot from '../hoc/withRoot';
import ActionsContainer from '../containers/actions';

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
