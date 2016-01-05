import React from 'react';
import HeaderNav from './HeaderNav';
import Icon from './Icon';
import FixedPlusBtn from './FixedPlusBtn';

export default function ListsView({lists, selectList, addList}) {
  return (
    <div>
      <HeaderNav title="ListApp" />
      <div className="list-group">
        {lists.map(list =>
          <ListLink list={list} onClick={() => selectList(list.id)} key={list.id} />
        )}
      </div>
      <FixedPlusBtn onClick={addList} />
    </div>
  )
}

function ListLink({list, onClick}) {
  const numCompleted = list.items.filter(item => item.completed).length;
  return (
    <div onClick={onClick} key={list.id} className="list-group-item" style={{cursor: 'pointer'}}>
      <div className="pull-right">
        <Icon icon="keyboard_arrow_right" style={{fontSize: 48}} />
      </div>
      <h4 className="list-group-item-heading">{list.title}</h4>
      <p className="list-group-item-text">
        {numCompleted} of {list.items.length} complete
      </p>
    </div>
  );
}
