import React from 'react';
import {ListsHeader} from './Header';
import Icon from './Icon';

const styles = {
  fixedBtnBtn: {
    fontSize: 24,
    bottom: 20,
    right: 25,
    position: 'fixed',
  },
};

export default function ListsView({lists, selectList, addList}) {
  return (
    <div>
      <ListsHeader />
      <div className="list-group">
        {lists.map(list =>
          <ListLink list={list} onClick={() => selectList(list.id)} key={list.id} />
        )}
      </div>
      <a style={styles.fixedBtnBtn} onClick={addList}>
        <Icon icon="plus" />
      </a>
    </div>
  )
}

function ListLink({list, onClick}) {
  const numCompleted = list.items.filter(item => item.completed).length;
  return (
    <div onClick={onClick} key={list.id} className="list-group-item" style={{cursor: 'pointer'}}>
      <div className="pull-right">
        <Icon icon="chevron-right" style={{fontSize: 24, paddingTop: 10}} />
      </div>
      <h4 className="list-group-item-heading">{list.title}</h4>
      <p className="list-group-item-text">
        {numCompleted} of {list.items.length} complete
      </p>
    </div>
  );
}
