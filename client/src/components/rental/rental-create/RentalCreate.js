import React from 'react';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../actions';
import RentalCreateForm from './RentalCreateForm';

export class RentalCreate extends React.Component {
  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    };

    this.rentalCateogies = ['апартаменты', 'дом', 'квартира'];

    this.createRental = this.createRental.bind(this);
  }

  createRental(rentalData) {
    actions.createRental(rentalData).then(
      () => this.setState({ redirect: true }),
      (errors) => this.setState({ errors })
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/rentals' }} />;
    }

    return (
      <section id="newRental">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Создать арендное помещение</h1>
              <RentalCreateForm
                submitCb={this.createRental}
                options={this.rentalCateogies}
                errors={this.state.errors}
              />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">Тысячи мест ждут тебя.</h2>
                <img src="https://storage.cloud.google.com/room-book-bukcet/ralph-kayden-2d4lAQAlbDA-unsplash.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
