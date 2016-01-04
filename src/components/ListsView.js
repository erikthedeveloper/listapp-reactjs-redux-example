import React from 'react';
import HeaderNav from './HeaderNav';
import Icon from './Icon';
import FixedPlusBtn from './FixedPlusBtn';

export default function ListsView(props) {
  const {lists, selectList, addList} = props;
  return (
    <div>
      <HeaderNav title="ListApp" />

      <div className="list-group">
        {lists.map(list => {
          const numCompleted = list.items.filter(item => item.completed).length;
          return (
            <div
              key={list.id}
              className="list-group-item"
              style={{cursor: 'pointer'}}
              onClick={() => selectList(list.id)}
              >
              <div className="pull-right">
                <Icon
                  icon="keyboard_arrow_right"
                  style={{fontSize: 48}}
                  />
              </div>
              <h4 className="list-group-item-heading">{list.title}</h4>
              <p className="list-group-item-text">
                {numCompleted} of {list.items.length} complete
              </p>
            </div>
          );
        })}
      <FixedPlusBtn onClick={addList} />
    </div>
  </div>
  )
}
