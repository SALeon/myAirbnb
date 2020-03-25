import React, { Component } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import { ToastContainer } from 'react-toastify';
// import ErrorBoundary from './components/ErrorBoudary/ErrorBoundary';
import { createBrowserHistory } from 'history';
import Header from './components/shared/Header';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalSearchListing from './components/rental/rental-listing/RentalSearchListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
import RentalUpdate from './components/rental/rental-detail/RentalUpdate';
import { RentalCreate } from './components/rental/rental-create/RentalCreate';
import Login from './components/login/Login';
import { Register } from './components/register/Register';
import { RentalManage } from './components/rental/rental-manage/RentalManage';
import BookingManage from './components/booking/booking-manage/BookingManage';
import { ProtectedRoute } from './components/shared/auth/ProtectedRoute';
import * as actions from './actions';
import { LoggedInRoute } from './components/shared/auth/LoggedInRoute';
import './App.scss';

const history = createBrowserHistory();
const store = require('./reducers').init();

class App extends Component {
  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <BrowserRouter history={history}>

        <StripeProvider apiKey="pk_test_GnbYtTPaHpEW0reU1ShDv3FY00sAws0p4e">
          <Provider store={store}>
            <div className="App">
              <ToastContainer />
              <Header logout={this.logout} />
              <div className="container">
                <Switch>
                  <Route exact path="/" render={() => <Redirect to="/rentals" />} />
                  <Route exact path="/rentals" component={RentalListing} />
                  <Route exact path="/rentals/:city/homes" component={RentalSearchListing} />
                  <ProtectedRoute exact path="/rentals/manage" component={RentalManage} />
                  <ProtectedRoute exact path="/bookings/manage" component={BookingManage} />
                  <ProtectedRoute exact path="/rentals/new" component={RentalCreate} />
                  <Route exact path="/rentals/:id" component={RentalDetail} />
                  <Route exact path="/rentals/:id/edit" component={RentalUpdate} />
                  <Route exact path="/login" component={Login} />
                  <LoggedInRoute exact path="/register" component={Register} />
                  <Route path="*" exact render={() => <Redirect to="/rentals" />} />
                </Switch>
              </div>
            </div>
          </Provider>
        </StripeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
