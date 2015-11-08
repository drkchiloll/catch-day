import React from 'react';
import { History as RouteHistory } from 'react-router';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import h from '../helpers';

@autobind
export default class StorePicker extends React.Component {
  goToStore(e) {
    e.preventDefault();
    // Get the Data From the Input
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
    // Transition From StorePicker to App
  }
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
}

reactMixin.onClass(StorePicker, RouteHistory);
