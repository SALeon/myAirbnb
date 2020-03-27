import React from 'react';
import { Link } from 'react-router-dom';
import { pretifyDate, toUpperCase } from '../../../helpers';

export function BookingCard(props) {
  const { booking } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          {booking.rental ? booking.rental.category : 'Удаленные аренды'}
        </div>
        <div className="card-block">
          {booking.rental
            && (
            <div>
              <h4 className="card-title"> {booking.rental.title} - {toUpperCase(booking.rental.city)}</h4>
              <p className="card-text booking-desc">{booking.rental.description}</p>
            </div>
            )
          }
          <p className="card-text booking-days">{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} days</p>
          <p className="card-text booking-price"><span>Price: </span> <span className="booking-price-value">{booking.totalPrice} $</span></p>
          {booking.rental
            && <Link className="btn btn-primary" to={`/rentals/${booking.rental._id}`}>Перейти к аренде</Link>
          }
        </div>
        <div className="card-footer text-muted">
          Создано {pretifyDate(booking.createdAt)}
        </div>
      </div>
    </div>
  );
}


export function PaymentCard(props) {
  const {
    booking,
    payment,
    paymentBtns,
  } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          Запрос от {payment.fromUser.username}
        </div>
        <div className="card-block">
          {booking.rental
            && (
            <div>
              <h4 className="card-title"> {booking.rental.title} - {toUpperCase(booking.rental.city)}</h4>
              <p className="card-text booking-desc">{booking.rental.description}</p>
            </div>
            )
          }
          <p className="card-text booking-days">{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} days</p>
          <p className="card-text booking-price"><span>Price: </span> <span className="booking-price-value">{payment.amount / 100} $</span></p>
          <p className="card-text payment-status">Status: {payment.status}</p>
          {booking.rental
            && <Link className="btn btn-primary" to={`/rentals/${booking.rental._id}`}>Перейти</Link>
          }
        </div>
        <div className="card-footer text-muted">
          Создано {pretifyDate(booking.createdAt)}
          {payment.status === 'pending' && paymentBtns && paymentBtns(payment)}
        </div>
      </div>
    </div>
  );
}
