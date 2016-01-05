import React from 'react';

function Icon({icon}) {
  return (
    <span className={`glyphicon glyphicon-${icon}`} />
  )
}

function IconButton({icon, onClick, color}) {
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

export default function ListItem(props) {
  const {item} = props;
  if (item.completed) return (
    <CompletedItem {...props} />
  )
  if (item.editing) return (
    <EditingItem {...props} />
  )
  return (
    <Item {...props} />
  )
}

function Item({item, updateItem, deleteItem}) {
  const beginEditing = () => updateItem({editing: true});
  const completeItem = () => updateItem({completed: true});
  return (
    <div className="list-group-item">
      <div className="row h5">
        <div className="col-xs-7">
          <IconButton icon="ok" color="muted" onClick={completeItem} />
          <span onDoubleClick={beginEditing}>{item.name}</span>
        </div>
        <div className="col-xs-5 text-right">
          <IconButton icon="pencil" color="primary" onClick={beginEditing} />
          <IconButton icon="remove" color="danger" onClick={deleteItem} />
        </div>
      </div>
    </div>
  )
}

function CompletedItem({item, updateItem, deleteItem}) {
  const uncompleteItem = () => updateItem({completed: false});
  return (
    <div className="list-group-item">
      <div className="row h5">
        <div className="col-xs-7" style={{opacity: '0.7'}}>
          <IconButton icon="ok" color="success" onClick={uncompleteItem} />
          <s><span className="h5">{item.name}</span></s>
        </div>
        <div className="col-xs-5 text-right">
          <IconButton icon="remove" color="danger" onClick={deleteItem} />
        </div>
      </div>
    </div>
  )
}

function EditingItem({item, updateItem}) {
  const endEditing = () => updateItem({editing: false});
  const onSubmit = (event) => {
    event.preventDefault();
    endEditing();
  }
  return (
    <div className="list-group-item">
      <div className="row h5">
        <div className="col-xs-7">
          <form onSubmit={onSubmit} style={{paddingLeft: '1.5em'}}>
            <input
              type="text"
              className="form-control input-md"
              value={item.name}
              onChange={({target: {value}}) => updateItem({name: value})}
              />
          </form>
        </div>
        <div className="col-xs-5 text-right">
          <IconButton icon="floppy-disk" color="primary" onClick={endEditing} />
        </div>
      </div>
    </div>
  )
}
