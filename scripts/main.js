var React = require('react'),
    ReactDOM = require('react-dom');

var App = React.createClass({
  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header />
        </div>
        <Order />
        <Inventory />
      </div>
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
      <p> Inventory </p>
    );
  }
});

var Header = React.createClass({
  render() {
    return (
      <p> Header </p>
    );
  }
});

var StorePicker = React.createClass({
  displayName : 'StorePicker',
  render() {
    return (
      <form className='store-selector'>
        <h2>Please Enter a Store</h2>
        <input
          type='text'
          ref='storeId'
          required />
        <input
          type='submit'/>
      </form>
    );
  }
});

ReactDOM.render(<App />, document.querySelector('#main'));
