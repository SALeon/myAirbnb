import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from '../shared/form/BwmInput';
import { BwmResError } from '../shared/form/BwmResError';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        type="text"
        label="Имя пользователя"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="password"
        type="password"
        label="password"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="passwordConfirmation"
        type="password"
        label="Password Confirmation"
        className="form-control"
        component={BwmInput}
      />
      <button className="btn btn-primary btn-form" type="submit" disabled={!valid || pristine || submitting}>
        Регистрация
      </button>
      <BwmResError errors={errors} />
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = 'Имя пользователя минимальная длина 4 символа!';
  }

  if (!values.email) {
    errors.email = 'Введите email!';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Введите повторно пароль!';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'пароль должен быть одинаковый';
  }

  return errors;
};

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm);
