import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import MoviesList from './components/MoviesList';
import AppNavbar from './components/AppNavbar';
import Details from './components/Details';
import Tickets from './components/Tickets';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Switch>
              <Route exact path="/" component={MoviesList} />
              <Route path="/details" component={Details} />
              <Route path="/tickets" component={Tickets} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
