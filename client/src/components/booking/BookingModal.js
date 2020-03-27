import React from 'react';
import Modal from 'react-responsive-modal';
import { BwmResError } from '../shared/form/BwmResError';

export function BookingModal(props) {
  const { open,
    closeModal,
    booking,
    confirmModal,
    errors,
    rentalPrice,
    acceptPayment,
    disabled } = props;

  return (
    <Modal open={open} onClose={closeModal} little classNames={{ modal: 'booking-modal' }}>
      <h4 className="modal-title title">Оплата аренды</h4>
      <p className="dates">{booking.startAt} / {booking.endAt}</p>
      <div className="modal-body">
        <em>{booking.days}</em> ночей /
        <em>{rentalPrice}$</em> за ночь
        <p>Гостей: <em>{booking.guests}</em></p>
        <p>Стоимость: <em>{booking.totalPrice}$ </em></p>

        {acceptPayment && acceptPayment()}

        <p>Подтвердить аренду для выбранных дней?</p>
      </div>
      <BwmResError errors={errors} />
      <div className="modal-footer">
        <button disabled={disabled} onClick={confirmModal} type="button" className="btn btn-primary">Оплатить</button>
        <button type="button" onClick={closeModal} className="btn btn-primary">Отмена</button>
      </div>
    </Modal>
  );
}
