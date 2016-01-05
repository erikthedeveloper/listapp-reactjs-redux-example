import React from 'react';
import Icon from './Icon';

const styles = {
  fixedPlusBtn: {
    bottom: 20,
    right: 25,
    position: 'fixed',
  },
}

export default function FixedPlusBtn({onClick}) {
  return (
    <a style={styles.fixedPlusBtn} onClick={onClick}>
      <Icon icon="add" style={{fontSize: 48}} />
    </a>
  )
}
