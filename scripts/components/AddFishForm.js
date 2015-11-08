import React from 'react';
import autobind from 'autobind-decorator';

@autobind
export default class AddFishForm extends React.Component {
createFish(e) {
    // Stop the Form From Submitting
    e.preventDefault();
    // Take the Data From the Form and Create an Object
    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    };
    // Add the Fish to the App State
    this.props.addFish(fish);
    this.refs.fishForm.reset();
  }
  render() {
    return (
      <form ref='fishForm' className='fish-edit' onSubmit={this.createFish}>
        <input type='text' ref='name' placeholder='Fish Name'/>
        <input type='text' ref='price' placeholder='Fish Price'/>
        <select ref='status'>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea type='text' ref='desc' placeholder='Desc'></textarea>
        <input type='text' ref='image' placeholder='URL to Image' />
        <button type='submit'>+ Add Item</button>
      </form>
    );
  }
}

AddFishForm.propTypes = {
  addFish : React.PropTypes.func
};
