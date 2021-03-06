import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as moment from 'moment';
import * as actions from '../../actions';
import Payment from '../payment/Payment';
import { getRangeOfDates } from '../../helpers';
import { BookingModal } from './BookingModal';

class Booking extends React.Component {
  constructor() {
    super();

    this.bookedOutDates = [];
    this.dateRef = React.createRef();

    this.state = {
      proposedBooking: {
        startAt: '',
        endAt: '',
        guests: '',
        paymentToken: ''
      },
      modal: {
        open: false
      },
      errors: []
    };

    this.checkInvalidDates = this.checkInvalidDates.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.cancelConfirmation = this.cancelConfirmation.bind(this);
    this.reserveRental = this.reserveRental.bind(this);
    this.setPaymentToken = this.setPaymentToken.bind(this);
  }

  componentWillMount() {
    this.getBookedOutDates();
  }

  getBookedOutDates() {
    const { bookings } = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  setPaymentToken(paymentToken) {
    const { proposedBooking } = this.state;
    proposedBooking.paymentToken = paymentToken;

    this.setState({
      proposedBooking
    });
  }

  cancelConfirmation() {
    this.setState({
      modal: {
        open: false
      }
    });
  }

  selectGuests(event) {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value, 10)
      }
    });
  }

  handleApply(event, picker) {
    const startAt = picker.startDate.format('Y/MM/DD');
    const endAt = picker.endDate.format('Y/MM/DD');

    this.dateRef.current.value = `${startAt} до ${endAt}`;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt
      }
    });
  }

  checkInvalidDates(date) {
    return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
  }

  addNewBookedOutDates(booking) {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  resetData() {
    this.dateRef.current.value = '';

    this.setState({
      proposedBooking: {
        guests: ''
      }
    });
  }

  confirmProposedData() {
    const { startAt, endAt } = this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const { rental } = this.props;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental
      },
      modal: {
        open: true
      }
    });
  }

  reserveRental() {
    actions.createBooking(this.state.proposedBooking).then(
      booking => {
        this.addNewBookedOutDates(booking);
        this.cancelConfirmation();
        this.resetData();
        toast.success('Резерв жилья успешно прошел ! Наслаждайся.');
      },
      errors => {
        this.setState({
          errors
        });
      }
    );
  }

  render() {
    const {
      rental,
      auth: { isAuth }
    } = this.props;
    const { startAt, endAt, guests, paymentToken } = this.state.proposedBooking;

    return (
      <div className="booking">
        <h3 className="booking-price">
          ${rental.dailyRate}
          <span className="booking-per-night">за ночь</span>
        </h3>
        <hr />
        { !isAuth
          && (
          <Link className="btn btn-primary btn-confirm btn-block" to={{ pathname: '/login' }}>
            Войди в приложение
          </Link>
          )
        }
        { isAuth
          && (
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="dates">Даты</label>
              <DateRangePicker
                onApply={this.handleApply}
                isInvalidDate={this.checkInvalidDates}
                opens="left"
                containerStyles={{ display: 'block' }}
              >
                <input ref={this.dateRef} id="dates" type="text" className="form-control" />
              </DateRangePicker>
            </div>
            <div className="form-group">
              <label htmlFor="guests">Гости</label>
              <input
                onChange={(event) => { this.selectGuests(event); }}
                value={guests}
                min="0"
                type="number"
                className="form-control"
                id="guests"
                aria-describedby="guests"
                placeholder=""
              />
            </div>
            <button disabled={!startAt || !endAt || !guests} onClick={() => this.confirmProposedData()} className="btn btn-primary btn-confirm btn-block">Зарезервируй сейчас</button>
          </React.Fragment>
          )
        }
        <hr />
        <p className="booking-note-title">Люди интересуются этим жильем</p>
        <p className="booking-note-text">
          Более 500 человек смотрели это жилье за прошлый месяц.
        </p>
        <BookingModal
          open={this.state.modal.open}
          closeModal={this.cancelConfirmation}
          confirmModal={this.reserveRental}
          booking={this.state.proposedBooking}
          errors={this.state.errors}
          rentalPrice={rental.dailyRate}
          disabled={!paymentToken}
          acceptPayment={() => <Payment setPaymentToken={this.setPaymentToken} />}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Booking);
