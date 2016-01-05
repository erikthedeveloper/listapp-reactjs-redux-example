import React from 'react';
import { IconButton } from './Icon';

export default function ListItem(props) {
  const {item} = props;
  if (item.completed) return (
    <CompletedItem {...props} />
  )
  if (item.editing) return (
    <EditingItem {...props} />
  )
  return (
    <ActiveItem {...props} />
  )
}

function ActiveItem({item, updateItem, deleteItem}) {
  const beginEditing = () => updateItem({editing: true});
  const completeItem = () => updateItem({completed: true});
  const actionButtons = [
    {icon: "pencil", color: "primary", onClick: beginEditing},
    {icon: "remove", color: "danger", onClick: deleteItem}
  ];
  return (
    <RowItem actionButtons={actionButtons}>
      <IconButton icon="ok" color="muted" onClick={completeItem} />
      <span onDoubleClick={beginEditing}>{item.name}</span>
    </RowItem>
  )
}

function CompletedItem({item, updateItem, deleteItem}) {
  const uncompleteItem = () => updateItem({completed: false});
  const actionButtons = [
    {icon: "remove", color: "danger", onClick: deleteItem}
  ];
  return (
    <RowItem actionButtons={actionButtons}>
      <IconButton icon="ok" color="success" onClick={uncompleteItem} />
      <s><span className="h5">{item.name}</span></s>
    </RowItem>
  )
}

function EditingItem({item, updateItem}) {
  const endEditing = () => updateItem({editing: false});
  const onSubmit = (event) => {
    event.preventDefault();
    endEditing();
  }
  const actionButtons = [
    {icon: "floppy-disk", color: "primary", onClick: endEditing}
  ];
  return (
    <RowItem actionButtons={actionButtons}>
      <form onSubmit={onSubmit} style={{paddingLeft: '1.5em'}}>
        <input
          type="text"
          className="form-control input-md"
          value={item.name}
          onChange={({target: {value}}) => updateItem({name: value})}
          />
      </form>
    </RowItem>
  )
}

function RowItem({children, actionButtons}) {
  return (
    <div className="list-group-item">
      <div className="row h5">
        <div className="col-xs-7">
          {children}
        </div>
        <div className="col-xs-5 text-right">
          {actionButtons.map(btnProps =>
            <IconButton key={btnProps.icon} {...btnProps} />
          )}
        </div>
      </div>
    </div>
  )
}
