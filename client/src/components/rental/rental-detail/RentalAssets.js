import React from 'react';

export function RentalAssets() {
  return (
    <div className="rental-assets">
      <h3 className="title">Assets</h3>
      <div className="row">
        <div className="col-md-6">
          <span><i className="fa fa-asterisk" /> Кондиционер</span>
          <span><i className="fa fa-thermometer" /> Обогреватель</span>
          <span><i className="fa fa-location-arrow" /> Утюг</span>
        </div>
        <div className="col-md-6">
          <span><i className="fa fa-desktop" /> Место для работы</span>
          <span><i className="fa fa-cube" /> Стиральная машина</span>
          <span><i className="fa fa-cube" /> Сушильная машина</span>
        </div>
      </div>
    </div>
  );
}
