import React from 'react';

export default function Icon({icon, ...otherProps}) {
  return (
    <span className={`glyphicon glyphicon-${icon}`} {...otherProps} />
  )
}

export function IconButton({icon, onClick, color}) {
  const className = `text-${color}`;
  const styles = {
    padding: '0 5px',
  };
  return (
    <a onClick={onClick} className={className} style={styles}>
      <Icon icon={icon} />
    </a>
  )
}
