import React from 'react';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';
import RegisterForm from './RegisterForm';

export class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    };

    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(userData) {
    actions.register(userData).then(
      () => this.setState({ redirect: true }),
      errors => this.setState({ errors })
    );
  }

  render() {
    const { errors, redirect } = this.state;

    if (redirect) {
      return <Redirect to={{ pathname: '/login', state: { successRegister: true } }} />;
    }

    return (
      <section id="register">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1> Регистрация </h1>
              <RegisterForm submitCb={this.registerUser} errors={errors} />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">Пользуйся доступным жильем</h2>
                <img src=" https://images.unsplash.com/photo-1534838813692-d6d37d710f9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60 500w" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
