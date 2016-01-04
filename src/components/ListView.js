import React from 'react';
import {newItem} from '../App-data';
import HeaderNav from './HeaderNav';
import Icon from './Icon';
import FixedPlusBtn from './FixedPlusBtn';
import ListItem from './ListItem';

const styles = {
  largeIcon: {
    fontSize: 32,
  },
  footerLink: {
    bottom: 15,
    width: '100%',
    position: 'fixed',
    textAlign: 'center',
  },
}

export default function ListView(props) {
  const {
    list,
    updateList,
    deleteList,
    showCompleted,
    toggleShowCompleted,
    navigateBack,
  } = props;

  const addItem = (data) => {
    const items = list.items.concat([newItem(data)]);
    updateList({...list, items});
  };

  const deleteItem = (id) => {
    const items = list.items.filter(item => item.id !== id);
    updateList({...list, items});
  }

  const updateItem = (id, data) => {
    const items = list.items
      .map(item => (item.id !== id)
        ? item
        : {...item, ...data}
      );
    updateList({...list, items});
  }

  const items = (showCompleted)
    ? list.items
    : list.items.filter(item => !item.completed);

  const navLeft = list.editing
    ? (
      <Icon
        icon="delete"
        onClick={deleteList}
        />
    )
    : (
      <Icon
        icon="keyboard_arrow_left"
        onClick={navigateBack}
        style={styles.largeIcon}
        />
    );
  const navTitle = list.editing
    ? (
      <input
        type="text"
        className="form-control input-md"
        value={list.title}
        onChange={({target: {value}}) => updateList({...list, title: value})}
        />
    )
    : (
      list.title
    );
  const navRight = list.editing
    ? (
      <Icon
        icon="save"
        onClick={() => updateList({...list, editing: false})}
        style={{paddingRight: 15}}
        />
    )
    : (
      <Icon
      icon="mode_edit"
      onClick={() => updateList({...list, editing: true})}
      style={{paddingRight: 15}}
        />
    );

  return (
    <div>
      <HeaderNav left={navLeft} title={navTitle} right={navRight} />

      <div className="list-group">
        {items.map(item => (
          <ListItem
            key={item.id}
            item={item}
            updateItem={(data) => updateItem(item.id, data)}
            deleteItem={() => deleteItem(item.id)}
            />
        ))}
      </div>

      <FixedPlusBtn onClick={addItem} />
      <a onClick={toggleShowCompleted} style={styles.footerLink}>
        {showCompleted ? 'hide' : 'show'} completed
      </a>
    </div>
  )
}
