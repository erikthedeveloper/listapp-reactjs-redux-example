import React from 'react';
import * as apiClient from '../http/apiClient';
import {newItem} from '../factories';
import {ListHeader} from './Header';
import Icon from './Icon';
import FixedPlusBtn from './FixedPlusBtn';
import ListItem from './ListItem';

const styles = {
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
    apiClient.createListItem(list.id, newItem(data))
      .end((err, res) => {
        const item = res.body;
        const items = list.items.concat([item]);
        updateList({items});
      })
  };

  const deleteItem = (id) => {
    apiClient.deleteListItem(list.id, id)
      .end((err, res) => {
        const items = list.items.filter(item => item.id !== id);
        updateList({items});
      });
  }

  const updateItem = (id, data) => {
    apiClient.updateListItem(list.id, id, data)
      .end((err, res) => {
        const items = list.items
          .map(item => (item.id !== id)
            ? item
            : {...item, ...res.body}
          );
        updateList({items});
      });
  }

  const items = (showCompleted)
    ? list.items
    : list.items.filter(item => !item.completed);

  return (
    <div>
      <ListViewHeader {...{list, updateList, deleteList, navigateBack}} />

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

      <FixedPlusBtn onClick={() => addItem({})} />
      <a onClick={toggleShowCompleted} style={styles.footerLink}>
        {showCompleted ? 'hide' : 'show'} completed
      </a>
    </div>
  )
}

function ListViewHeader({list, updateList, deleteList, navigateBack}) {
  const {editing} = list;
  const navLeft = (
    <Icon
      icon={editing ? 'delete' : 'keyboard_arrow_left'}
      onClick={editing ? deleteList : navigateBack}
      />
  );
  const navTitle = !editing ? list.title : (
    <input
      type="text"
      className="form-control input-md"
      value={list.title}
      onChange={({target: {value}}) => updateList({title: value})}
      />
  );
  const navRight = (
    <Icon
      icon={editing ? 'save' : 'mode_edit'}
      onClick={() => updateList({editing: !editing})}
      style={{paddingRight: 15}}
      />
  );

  return (
    <HeaderNav left={navLeft} title={navTitle} right={navRight} />
  )
}
