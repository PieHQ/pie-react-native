import React from 'react'

export default ({ timeToClose }) => (
  <div className="row">
    <div className="col-xs-12">
      <div className="radial radial--active" style={{ height: '110px', width: '110px' }}>
        <span className="h3 radial__label">{timeToClose}</span>
      </div>
      <div className="alert bg--success">
        <div className="alert__body text-center">
          <span>Your Transaction was successfull! This window will close automatically when the timers above runs down!</span>
        </div>
      </div>
    </div>
  </div>
)
