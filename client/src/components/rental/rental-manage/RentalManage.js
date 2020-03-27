import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as actions from '../../../actions';
import { RentalManageCard } from './RentalManageCard';
import { RentalManageModal } from './RentalManageModal';

export class RentalManage extends React.Component {
  constructor() {
    super();

    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    };

    this.deleteRental = this.deleteRental.bind(this);
  }

  componentWillMount() {
    this.setState({ isFetching: true });

    actions.getUserRentals().then(
      userRentals => this.setState({ userRentals, isFetching: false }),
      errors => this.setState({ errors, isFetching: false })
    );
  }

  deleteRentalFromList(rentalIndex) {
    const userRentals = this.state.userRentals.slice();
    userRentals.splice(rentalIndex, 1);

    this.setState({ userRentals });
  }

  deleteRental(rentalId, rentalIndex) {
    actions.deleteRental(rentalId).then(
      () => this.deleteRentalFromList(rentalIndex),
      errors => toast.error(errors[0].detail)
    );
  }

  renderRentalCards(rentals) {
    return rentals.map((rental, index) => (
      <RentalManageCard
        modal={<RentalManageModal bookings={rental.bookings} />}
        key={index}
        rental={rental}
        rentalIndex={index}
        deleteRentalCb={this.deleteRental}
      />
    ));
  }

  render() {
    const { userRentals, isFetching } = this.state;

    return (
      <section id="userRentals">
        <ToastContainer />
        <h1 className="page-title">Мои помещения</h1>
        <div className="row">
          {this.renderRentalCards(userRentals)}
        </div>
        { !isFetching && userRentals.length === 0
          && (
          <div className="alert alert-warning">
            У тебя уще нет помещения для аренды.
            <Link style={{ marginLeft: '10px', }} className="btn btn-primary" to="/rentals/new">Создай аренду</Link>
          </div>
          )
        }
      </section>
    );
  }
}
