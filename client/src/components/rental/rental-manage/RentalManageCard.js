import React from 'react';
import { Link } from 'react-router-dom';
import { toUpperCase, pretifyDate } from '../../../helpers';

export class RentalManageCard extends React.Component {
  constructor() {
    super();

    this.state = {
      wantDelete: false
    };
  }

  showDeleteMenu() {
    this.setState({
      wantDelete: true
    });
  }

  closeDeleteMenu() {
    this.setState({
      wantDelete: false
    });
  }

  deleteRental(rentalId, rentalIndex) {
    this.setState({ wantDelete: false });

    this.props.deleteRentalCb(rentalId, rentalIndex);
  }


  render() {
    const { rental, modal, rentalIndex } = this.props;
    const { wantDelete } = this.state;

    const deleteClass = wantDelete ? 'toBeDeleted' : '';

    return (
      <div className="col-md-4">
        <div className={`card text-center ${deleteClass}`}>
          <div className="card-block">
            <h4 className="card-title">{rental.title} - {toUpperCase(rental.city)}</h4>
            <Link className="btn btn-primary" to={`/rentals/${rental._id}`}>Перейти</Link>
            { rental.bookings && rental.bookings.length > 0 && modal }
          </div>
          <div className="card-footer text-muted">
            Создано {pretifyDate(rental.createdAt)}
            { !wantDelete
              && (
              <React.Fragment>
                <button onClick={() => { this.showDeleteMenu(); }} className="btn btn-danger"> Удалить </button>
                <Link className="btn btn-warning" to={{ pathname: `/rentals/${rental._id}/edit`, state: { isUpdate: true } }}> Редактировать </Link>
              </React.Fragment>
              )
            }
            { wantDelete
              && (
              <div className="delete-menu">
                Уверен?
                <button onClick={() => { this.deleteRental(rental._id, rentalIndex); }} className="btn btn-danger"> Да </button>
                <button onClick={() => { this.closeDeleteMenu(); }} className="btn btn-success"> Нет </button>
              </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
