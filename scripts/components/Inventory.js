import React from 'react';
import AddFishForm from './AddFishForm';

export default class Inventory extends React.Component {
  constructor() {
    super();

    this.renderInventory = this.renderInventory.bind(this);
  }
  propTypes : {
    addFish : React.PropTypes.func,
    loadSamples : React.PropTypes.func,
    removeFish : React.PropTypes.func,
    linkState : React.PropTypes.func,
    fishes : React.PropTypes.object
  }
  renderInventory(key) {
    var linkState = this.props.linkState;
    return (
      <form key={key} ref='fishForm' className='fish-edit' onSubmit={this.props.removeFish.bind(null, key)}>
        <input type='text' valueLink={linkState('fishes.'+ key +'.name')}/>
        <input type='text' valueLink={linkState('fishes.'+ key +'.price')}/>
        <select valueLink={linkState('fishes.'+ key +'.status')}>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea type='text' valueLink={linkState('fishes.'+ key +'.desc')}></textarea>
        <input type='text' valueLink={linkState('fishes.'+ key +'.image')} />
        <button type='submit'>Remove Fish</button>
      </form>
    );
  }
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}> Load Sample Fishes</button>
      </div>
    );
  }
}
