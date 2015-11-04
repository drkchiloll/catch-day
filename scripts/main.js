var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Navigation = ReactRouter.Navigation
    History = require('history/lib/createBrowserHistory');

var history = History();

var App = React.createClass({
  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market'/>
        </div>
        <Order />
        <Inventory />
      </div>
    );
  }
});

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
      <p> Inventory </p>
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
