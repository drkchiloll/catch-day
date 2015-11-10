import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
const ref = new Firebase('https://catch-day.firebaseio.com/');

@autobind
export default class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid : ''
    };
  }
  componentWillMount() {
    console.log('checking to see if we can log them in');
    var token = sessionStorage.getItem('token');
    if(token) {
      ref.authWithCustomToken(token, this.authHandler);
    }
  }
  logOut() {
    console.log('hello');
    ref.unauth();
    sessionStorage.removeItem('token');
    this.setState({ uid : '' });
  }
  authHandler(err, authData) {
    if(err) return;

    // save the login token in the browser
    sessionStorage.setItem('token', authData.token);
    const storeRef = ref.child(this.props.params.storeId);
    storeRef.on('value', (snapshot)=> {
      var data = snapshot.val() || {};

      // claim it as our own if there is no owner already
      if(!data.owner) {
        storeRef.set({ owner : authData.uid });
      }

      // update our state to reflect the current store owner and user
      this.setState({
        uid: authData.uid,
        owner: data.owner || authData.uid
      });
    });
  }
  authenticate(provider) {
    ref.authWithOAuthPopup(provider, this.authHandler);
  }
  renderLogin() {
    return (
      <nav className='login'>
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button
          className='github'
          onClick={this.authenticate.bind(this, 'github')}>
          Log in with Github
        </button>
      </nav>
    );
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
    let logoutButton = <button onClick={this.logOut}>Log Out!</button>;
    if(!this.state.uid) {
      return (
        <div>{this.renderLogin()}</div>
      );
    }

    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner of this store</p>
          {logoutButton}
        </div>
      );
    }
    return (
      <div>
        <h2>Inventory</h2>
        {logoutButton}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}> Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  addFish : React.PropTypes.func,
  loadSamples : React.PropTypes.func,
  removeFish : React.PropTypes.func,
  linkState : React.PropTypes.func,
  fishes : React.PropTypes.object
};
