var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    HistoryMixin = ReactRouter.History,
    History = require('history/lib/createBrowserHistory');

var history = History();

var h = require('./helpers');

var App = React.createClass({
  getInitialState() {
    return {
      fishes: {},
      order: {}
    };
  },
  addFish(fish) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-'+ timestamp] = fish;
    // set the state
    this.setState({fishes : this.state.fishes});
  },
  loadSamples() {
    this.setState({
      fishes: require('./sample-fishes')
    });
  },
  renderFish(key) {
    var fishes = this.state.fishes;
    return (
      <Fish key={key} index={key} details={fishes[key]}/>
    );
  },
  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market'/>
          <ul className='list-of-fishes'>
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    );
  }
});

var Fish = React.createClass({
  render() {
    var details = this.props.details;
    return (
      <li className='menu-fish'>
        <img src={details.image} alt={details.name} />
        <h3 className='fish-name'>
          {details.name}
          <span className='price'>{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
      </li>
    );
  }
})

var AddFishForm = React.createClass({
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
  },
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
})

var Header = React.createClass({
  render() {
    return (
      <header className='top'>
        <h1> Catch
          <span className='ofThe'>
            <span className='of'>of</span>
            <span className='the'>the</span>
          </span>
          Day
        </h1>
        <h3 className='tagline'><span>{this.props.tagline}</span></h3>
      </header>
    );
  }
});

var Order = React.createClass({
  render() {
    return (
      <p> Order </p>
    );
  }
});

var Inventory = React.createClass({
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}> Load Sample Fishes</button>
      </div>
    );
  }
});

var StorePicker = React.createClass({
  displayName : 'StorePicker',
  mixins : [HistoryMixin],
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

var NotFound = React.createClass({
  render() {
    return (
      <h1>Not Found</h1>
    );
  }
});

var routes = (
  <Router history={history}>
    <Route path='/' component={StorePicker} />
    <Route path='/store/:storeId' component={App} />
    <Route path='*' component={NotFound} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
