import React from 'react';
import { withRouter } from 'react-router-dom';

class RentalSearchInput extends React.Component {
  constructor() {
    super();

    this.searchInput = React.createRef();
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  handleSearch() {
    const { history } = this.props;
    const city = this.searchInput.current.value;
    const route = city ? `/rentals/${city}/homes` : '/rentals';
    history.push(route);
  }


  render() {
    return (
      <div className="form-inline my-2 my-lg-0">
        <input
          onKeyPress={(event) => { this.handleKeyPress(event); }}
          ref={this.searchInput}
          className="form-control mr-sm-2 bwm-search"
          type="search"
          placeholder='Попробуй "New York"'
          aria-label="Search"
        />
        <button
          onClick={() => { this.handleSearch(); }}
          className="btn btn-outline-success my-2 my-sm-0 btn-primary-search"
          type="submit"
        >Поиск
        </button>
      </div>
    );
  }
}


export default withRouter(RentalSearchInput);
