import React from 'react';

export default function Icon({icon, ...otherProps}) {
  return (
    <i className="material-icons" {...otherProps}>{icon}</i>
  )
}
