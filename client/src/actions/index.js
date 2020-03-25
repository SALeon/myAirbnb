import authService from '../services/auth-service';
import axiosService from '../services/axios-service';

import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL,
  FETCH_USER_BOOKINGS_INIT,
  UPDATE_RENTAL_SUCCESS,
  UPDATE_RENTAL_FAIL,
  RESET_RENTAL_ERRORS,
  RELOAD_MAP,
  RELOAD_MAP_FINISH,
} from './types';

const axiosInstance = axiosService.getInstance();

export const verifyRentalOwner = rentalId => axiosInstance.get(`/rentals/${rentalId}/verify-user`);

export const reloadMap = () => ({
  type: RELOAD_MAP,
});

export const reloadMapFinish = () => ({
  type: RELOAD_MAP_FINISH,
});

// RENTALS ATIONS ---------------------------

const fetchRentalByIdInit = () => ({
  type: FETCH_RENTAL_BY_ID_INIT,
});

const fetchRentalByIdSuccess = rental => ({
  type: FETCH_RENTAL_BY_ID_SUCCESS,
  rental,
});

const fetchRentalsSuccess = rentals => ({
  type: FETCH_RENTALS_SUCCESS,
  rentals,
});

const fetchRentalsInit = () => ({
  type: FETCH_RENTALS_INIT,
});

const fetchRentalsFail = errors => ({
  type: FETCH_RENTALS_FAIL,
  errors,
});

export const fetchRentals = (city) => {
  const url = city ? `/rentals?city=${city}` : '/rentals';

  return (dispatch) => {
    dispatch(fetchRentalsInit());

    axiosInstance
      .get(url)
      .then(res => res.data)
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
      .catch(({
        response,
      }) => dispatch(fetchRentalsFail(response.data.errors)));
  };
};

export const fetchRentalById = rentalId => function (dispatch) {
  dispatch(fetchRentalByIdInit());

  axiosInstance
    .get(`rentals/${rentalId}`)
    .then(res => res.data)
    .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
};

export const createRental = rentalData => axiosInstance.post('/rentals', rentalData).then(
  res => res.data,
  err => Promise.reject(err.response.data.errors),
);

export const resetRentalErrors = () => ({
  type: RESET_RENTAL_ERRORS,
});

const updateRentalSuccess = updatedRental => ({
  type: UPDATE_RENTAL_SUCCESS,
  rental: updatedRental,
});

const updateRentalFail = errors => ({
  type: UPDATE_RENTAL_FAIL,
  errors,
});

export const updateRental = (id, rentalData) => dispatch => axiosInstance
  .patch(`/rentals/${id}`, rentalData)
  .then(res => res.data)
  .then((updatedRental) => {
    dispatch(updateRentalSuccess(updatedRental));

    if (rentalData.city || rentalData.street) {
      dispatch(reloadMap());
    }
  })
  .catch(({
    response,
  }) => dispatch(updateRentalFail(response.data.errors)));

// USER BOOKINGS ACTIONS ---------------------------

const fetchUserBookingsInit = () => ({
  type: FETCH_USER_BOOKINGS_INIT,
});

const fetchUserBookingsSuccess = userBookings => ({
  type: FETCH_USER_BOOKINGS_SUCCESS,
  userBookings,
});

const fetchUserBookingsFail = errors => ({
  type: FETCH_USER_BOOKINGS_FAIL,
  errors,
});

export const fetchUserBookings = () => (dispatch) => {
  dispatch(fetchUserBookingsInit());

  axiosInstance
    .get('/bookings/manage')
    .then(res => res.data)
    .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
    .catch(({
      response,
    }) => dispatch(fetchUserBookingsFail(response.data.errors)));
};

// USER RENTALS ACTIONS ---------------------------

export const getUserRentals = () => axiosInstance.get('/rentals/manage').then(
  res => res.data,
  err => Promise.reject(err.response.data.errors),
);

export const deleteRental = rentalId => axiosInstance.delete(`/rentals/${rentalId}`).then(
  res => res.data,
  err => Promise.reject(err.response.data.errors),
);

// AUTH ACTIONS ---------------------------

const loginSuccess = () => {
  const username = authService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username,
  };
};

const loginFailure = errors => ({
  type: LOGIN_FAILURE,
  errors,
});

export const register = userData => axiosInstance.post('users/register', userData).then(
  res => res.data,
  err => Promise.reject(err.response.data.errors),
);

export const checkAuthState = () => (dispatch) => {
  if (authService.isAuthenticated()) {
    dispatch(loginSuccess());
  }
};

export const login = userData => dispatch => axiosInstance
  .post('users/auth', userData)
  .then(res => res.data)
  .then((token) => {
    authService.saveToken(token);
    dispatch(loginSuccess());
  })
  .catch(({
    response,
  }) => {
    dispatch(loginFailure(response.data.errors));
  });

export const logout = () => {
  authService.invalidateUser();

  return {
    type: LOGOUT,
  };
};

export const createBooking = booking => axiosInstance
  .post('/bookings', booking)
  .then(res => res.data)
  .catch(({
    response,
  }) => Promise.reject(response.data.errors));

export const uploadImage = (image, name) => {
  const formData = new FormData();
  formData.set('image', image, name);

  return axiosInstance
    .post('/image-upload', formData)
    .then(json => json.data)
    .catch(({
      response,
    }) => Promise.reject(response.data.errors[0]));
};

export const getPendingPayments = () => axiosInstance
  .get('/payments')
  .then(res => res.data)
  .catch(({
    response,
  }) => Promise.reject(response.data.errors));

export const acceptPayment = payment => axiosInstance
  .post('/payments/accept', payment)
  .then(res => res.data)
  .catch(({
    response,
  }) => Promise.reject(response.data.errors));

export const declinePayment = payment => axiosInstance
  .post('/payments/decline', payment)
  .then(res => res.data)
  .catch(({
    response,
  }) => Promise.reject(response.data.errors));
