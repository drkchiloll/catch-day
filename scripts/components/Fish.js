import React from 'react';
import h from '../helpers';

export default class Fish extends React.Component {
  constructor(props) {
    super(props);

    this.addToOrder = this.addToOrder.bind(this);
  }
  addToOrder() {
    var key = this.props.index;
    this.props.addToOrder(key);
  }
  render() {
    var details = this.props.details;
    var isAvailable = (details.status === 'available' ? true : false);
    var buttonText = (isAvailable ? 'Add to Order' : 'Sold Out!');
    return (
      <li className='menu-fish'>
        <img src={details.image} alt={details.name} />
        <h3 className='fish-name'>
          {details.name}
          <span className='price'>{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.addToOrder}>{buttonText}</button>
      </li>
    );
  }
}

Fish.propTypes = {
  details : React.PropTypes.object,
  index : React.PropTypes.string,
  addToOrder : React.PropTypes.func
};
