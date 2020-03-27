import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';
import { BookingCard, PaymentCard } from './BookingCard';


class BookingManage extends React.Component {
  state = {
    pendingPayments: []
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchUserBookings());
    this.getPendingPayments();
  }

  getPendingPayments() {
    actions.getPendingPayments()
      .then(pendingPayments => this.setState({ pendingPayments }))
      .catch(err => console.error(err));
  }

  acceptPayment(payment) {
    actions.acceptPayment(payment)
      .then(() => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err));
  }

  declinePayment(payment) {
    actions.declinePayment(payment)
      .then(() => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err));
  }

  filterPayments(payments) {
    return payments.map(payment => (payment.booking ? payment : null)).filter(payment => payment);
  }

  isHasPayments(payments) {
    return payments.length > 0;
  }

  renderBookings(bookings) {
    return bookings.map((booking, index) => <BookingCard booking={booking} key={index} />);
  }

  renderPayments(payments) {
    const filtered = this.filterPayments(payments);
    if (filtered.length) {
      return filtered.map((payment, index) => (
        <PaymentCard
          booking={payment.booking}
          payment={payment}
          paymentBtns={this.renderPaymentButtons}
          key={index}
        />
      ));
    }
  }

  renderPaymentButtons = (payment) => (
    <div>
      <button onClick={() => this.acceptPayment(payment)} className="btn btn-success">Принять</button>{' '}
      <button onClick={() => this.declinePayment(payment)} className="btn btn-danger">Отклонить</button>
    </div>
  )

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;
    const { pendingPayments } = this.state;

    return (
      <React.Fragment>
        <section id="userBookings">
          <h1 className="page-title">Мои аренды</h1>
          <div className="row">
            { this.renderBookings(bookings) }
          </div>
          { !isFetching && bookings.length === 0
            && (
            <div className="alert alert-warning">
              Ты еще не арендовал жилье? Сделай это сейчас.
              <Link style={{ marginLeft: '10px', }} className="btn btn-primary" to="/rentals">Свободные аренды</Link>
            </div>
            )
          }
        </section>
        <section id="pendingBookings">
          <h1 className="page-title">Ожидающие аренды</h1>
          <div className="row">
            { this.isHasPayments(pendingPayments) && this.renderPayments(pendingPayments) }
          </div>
          { !isFetching && pendingPayments.length === 0
            && (
            <div className="alert alert-warning">
              У тебя нет запросов аренды...
            </div>
            )
          }
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  };
}

export default connect(mapStateToProps)(BookingManage);
