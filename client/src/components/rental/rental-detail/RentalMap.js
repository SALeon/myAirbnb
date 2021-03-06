import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import { MapWithGeocode } from '../../map/GoogleMap';

class RentalMap extends React.Component {
  reloadMapFinish() {
    this.props.dispatch(actions.reloadMapFinish());
  }

  render() {
    const { location, map: { isReloading } } = this.props;

    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyADGTZ7q9Xas05ImiUSpqfU_xQDhm_mlz8&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%', }} />}
        containerElement={<div style={{ height: '405px', }} />}
        mapElement={<div style={{ height: '100%', }} />}
        location={location}
        isReloading={isReloading}
        mapLoaded={() => this.reloadMapFinish()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    map: state.map
  };
}

export default connect(mapStateToProps)(RentalMap);
