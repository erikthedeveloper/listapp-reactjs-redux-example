import React from 'react';
import Icon from './Icon';

export function ListsHeader({left, title, right}) {
  return (
    <Header title="ListApp" />
  );
}

export function ListHeader({list, updateList, deleteList, navigateBack}) {
  const {editing} = list;
  const navLeft = (
    <Icon
      icon={editing ? 'trash' : 'chevron-left'}
      onClick={editing ? deleteList : navigateBack}
      />
  );
  const navTitle = !editing ? list.title : (
    <input
      type="text"
      className="form-control input-md"
      value={list.title}
      onChange={({target: {value}}) => updateList({title: value})}
      autoFocus
      />
  );
  const navRight = (
    <Icon
      icon={editing ? 'floppy-save' : 'pencil'}
      onClick={() => updateList({editing: !editing})}
      style={{fontSize: 24, paddingRight: 15}}
      />
  );

  return (
    <Header left={navLeft} title={navTitle} right={navRight} />
  )
}

function Header({left, title, right}) {
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
  );
}
