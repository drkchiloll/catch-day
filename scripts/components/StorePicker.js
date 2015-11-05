import React from 'react';
import { History as RouteHistory } from 'react-router';
import h from '../helpers';

var StorePicker = React.createClass({
  displayName : 'StorePicker',
  mixins : [RouteHistory],
  goToStore(e) {
    e.preventDefault();
    // Get the Data From the Input
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
    // Transition From StorePicker to App
  },
  render() {
    return (
      <form onSubmit={this.goToStore} className='store-selector'>
        <h2>Please Enter a Store</h2>
        <input
          type='text'
          ref='storeId'
          defaultValue={h.getFunName()}
          required />
        <input
          type='submit'/>
      </form>
    );
  }
});

export default StorePicker;
