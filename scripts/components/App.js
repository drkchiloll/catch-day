import React from 'react';
import Catalyst from 'react-catalyst';
import Rebase from 're-base';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

let base = Rebase.createClass('https://catch-day.firebaseio.com/');

/*
  Pull in all Components Used
*/
import Header from './Header';
import Fish from './Fish';
import Inventory from './Inventory';
import Order from './Order';

@autobind
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fishes: {},
      order: {}
    };
  }
  componentDidMount() {
    base.syncState(this.props.params.storeId + '/fishes', {
      context: this,
      state: 'fishes'
    });
    var sessionStorageRef =
      sessionStorage.getItem('order-'+ this.props.params.storeId);

    if(sessionStorageRef) {
      // update our component state to reflect what is in sessionStorage
      this.setState({
        order: JSON.parse(sessionStorageRef)
      });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    sessionStorage.setItem('order-'+ this.props.params.storeId,
      JSON.stringify(nextState.order));
  }
  addToOrder(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({order : this.state.order});
  }
  removeFromOrder(key) {
    delete this.state.order[key];
    this.setState({ order: this.state.order });
  }
  addFish(fish) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-'+ timestamp] = fish;
    // set the state
    this.setState({fishes : this.state.fishes});
  }
  removeFish(key, e) {
    e.preventDefault();
    if(confirm('Are you sure you want to remove this fish?!'));
    this.state.fishes[key] = null;
    this.setState({ fishes: this.state.fishes });
  }
  loadSamples() {
    this.setState({
      fishes: require('../sample-fishes')
    });
  }
  renderFish(key) {
    var fishes = this.state.fishes;
    return (
      <Fish
        addToOrder={this.addToOrder}
        key={key}
        index={key}
        details={fishes[key]}/>
    );
  }
  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market'/>
          <ul className='list-of-fishes'>
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}/>
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          linkState={this.linkState.bind(this)}
          removeFish={this.removeFish}/>
      </div>
    );
  }
}

reactMixin.onClass(App, Catalyst.LinkedStateMixin);
