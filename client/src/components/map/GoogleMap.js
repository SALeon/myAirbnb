import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow
} from 'react-google-maps';
import { Cacher } from '../../services/cacher';


function MapComponent(props) {
  const { coordinates, isError, isLocationLoaded } = props;

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
      options={{ disableDefaultUI: !!isError }}
    >
      {isLocationLoaded && !isError && <Circle center={coordinates} radius={500} />}
      {isLocationLoaded && isError
       && (
       <InfoWindow position={coordinates} options={{ maxWidth: 300 }}>
         <div>
           Уууупс, есть проблема, чтобы найти местоположение на карте, мы пытаемся решить
           проблему как можно быстрее. Свяжитесь с хозяином для получения дополнительной информации,
           если вы все еще заинтересованы в бронировании этого места. Приносим извинения
           за задержку.
         </div>
       </InfoWindow>
       )}
    </GoogleMap>
  );
}

function withGeocode(WrappedComponent) {
  return class extends React.Component {
    constructor() {
      super();

      this.cacher = new Cacher();

      this.geocoder = new window.google.maps.Geocoder();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError: false,
        isLocationLoaded: false
      };
    }

    componentWillMount() {
      this.getGeocodedLocation();
    }

    componentDidUpdate() {
      if (this.props.isReloading) {
        this.getGeocodedLocation();
      }
    }

    getGeocodedLocation() {
      const { location } = this.props;

      if (this.cacher.isValueCached(location)) {
        this.updateCoordinates(this.cacher.getCachedValue(location));
      } else {
        this.geocodeLocation(location).then(
          (coordinates) => {
            this.updateCoordinates(coordinates);
          },
          () => {
            this.props.mapLoaded();
            this.setState({ isLocationLoaded: true, isError: true });
          }
        );
      }
    }

    geocodeLocation(location) {
      return new Promise((resolve, reject) => {
        this.geocoder.geocode({ address: location }, (result, status) => {
          if (status === 'OK') {
            const geometry = result[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

            this.cacher.cacheValue(location, coordinates);

            resolve(coordinates);
          } else {
            reject('ERROR!!!!');
          }
        });
      });
    }

    updateCoordinates(coordinates) {
      this.props.mapLoaded();

      this.setState({
        coordinates,
        isLocationLoaded: true
      });
    }


    render() {
      return (
        <WrappedComponent {...this.state} />
      );
    }
  };
}

export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));
