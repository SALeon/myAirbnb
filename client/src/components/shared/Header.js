import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RentalSearchInput from '../rental/RentalSearchInput';

class Header extends React.Component {
  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push('/rentals');
  }

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return <a className="nav-item nav-link clickable" onClick={this.handleLogout}>Выход</a>;/* eslint-disable-line */
    }

    return (
      <React.Fragment>
        <Link className="nav-item nav-link" to="/login">Вход <span className="sr-only">(current)</span></Link>
        <Link className="nav-item nav-link" to="/register">Регистрация</Link>
      </React.Fragment>
    );
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <a className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Для тебя
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/rentals/new"> Создать помещение</Link>
            <Link className="dropdown-item" to="/rentals/manage">Управляй твоими помещениями</Link>
            <Link className="dropdown-item" to="/bookings/manage">Управляй твоими арендами</Link>
          </div>
        </div>
      );
    }
  }

  render() {
    const { username, isAuth } = this.props.auth;


    return (
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/rentals">Арендуй и зарабатывай
            <img src="https://push.regione.puglia.it/documents/20181/0/houses.png/43efe188-34ec-4a6b-8985-c9e226a145fb?version=1.0&t=1465211139182&imagePreview=1" alt="" />
          </Link>
          <RentalSearchInput />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              { isAuth
                && <a className="nav-item nav-link">{username}</a>
              }
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps)(Header));
