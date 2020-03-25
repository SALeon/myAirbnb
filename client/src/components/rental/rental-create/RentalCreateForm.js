import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from '../../shared/form/BwmInput';
import { BwmSelect } from '../../shared/form/BwmSelect';
import { BwmTextArea } from '../../shared/form/BwmTextArea';
import { BwmFileUpload } from '../../shared/form/BwmFileUpload';
import { BwmResError } from '../../shared/form/BwmResError';
// import { required, minLength4 } from 'components/shared/form/validators';

const greaterThan = otherField => (value, previousValue, allValues) => (value > allValues[otherField] ? value : previousValue);

const RentalCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="title"
        type="text"
        label="Title"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="description"
        type="text"
        label="Description"
        rows="6"
        className="form-control"
        component={BwmTextArea}
      />
      <Field
        name="city"
        type="text"
        label="City"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="street"
        type="text"
        label="Street"
        className="form-control"
        component={BwmInput}
      />
      <Field
        options={options}
        name="category"
        label="Category"
        className="form-control"
        component={BwmSelect}
      />
      <Field
        name="image"
        label="Image"
        component={BwmFileUpload}
      />
      <Field
        name="bedrooms"
        min="0"
        type="number"
        label="Bedrooms"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="dailyRate"
        min="0"
        type="number"
        label="Daily Rate"
        className="form-control"
        symbol="$"
        component={BwmInput}
      />
      <Field
        name="shared"
        type="checkbox"
        label="Shared"
        className="form-control"
        component={BwmInput}
      />
      <button className="btn btn-primary btn-form" type="submit" disabled={!valid || pristine || submitting}>
        Create Rental
      </button>
      <BwmResError errors={errors} />
    </form>
  );
};

export default reduxForm({
  form: 'rentalCreateForm',
  initialValues: { shared: false, category: 'apartment' }
})(RentalCreateForm);
