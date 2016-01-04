import React from 'react';

export default function HeaderNav({left, title, right}) {
  return (
    <nav className="navbar navbar-default navbar-static-top" style={{marginBottom: 0}}>
      <div className="row">
        <div className="col-xs-3">
          <div className="navbar-brand">
            {left}
          </div>
        </div>
        <div className="col-xs-6">
          <h5 className="navbar-text text-center">{title}</h5>
        </div>
        <div className="col-xs-3 text-right">
          <div className="navbar-text">
            {right}
          </div>
        </div>
      </div>
    </nav>
  )
}
