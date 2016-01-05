import React from 'react';

/**
  * @deprecated Use Bootstrap instead!
  */
export default function Icon({icon, ...otherProps}) {
  return (
    <i className="material-icons" {...otherProps}>{icon}</i>
  )
}

export function Glyphicon({icon}) {
  return (
    <span className={`glyphicon glyphicon-${icon}`} />
  )
}

export function IconButton({icon, onClick, color}) {
  const className = `text-${color}`;
  const styles = {
    padding: '0 5px',
  };
  return (
    <a onClick={onClick} className={className} style={styles}>
      <Glyphicon icon={icon} />
    </a>
  )
}
