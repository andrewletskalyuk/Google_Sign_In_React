import React, { Component } from 'react';

export default function getDefaultValues(initialState, requiredFields) {
  return function Wrapper(WrappedComponent) {
    return class WrappedForm extends Component {
      state = {
        isFetching: false,
        data: initialState,
        errors: requiredFields,
      };

      render() {
        return <WrappedComponent
        {...this.state}
        {...this.props}
        handleInput={this.handleInput}
        handleSubmit={this.handleSubmit}
    />;
      }
    };
  };
}