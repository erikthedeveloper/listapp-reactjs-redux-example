import React from 'react';
import Icon from './Icon';

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
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-xs-7">
          <span className="h5" onDoubleClick={beginEditing}>{item.name}</span>
        </div>
        <div className="col-xs-5 text-right">
          <div className="btn-group">
            <a onClick={() => updateItem({completed: true})} className="btn btn-xs btn-success"><Icon icon="done" /></a>
            <a onClick={deleteItem} className="btn btn-xs btn-danger"><Icon icon="delete" /></a>
            <a onClick={beginEditing} className="btn btn-xs btn-primary"><Icon icon="mode_edit" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompletedItem({item, updateItem}) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-xs-7" style={{opacity: '0.7'}}>
          <s><span className="h5">{item.name}</span></s>
        </div>
        <div className="col-xs-5 text-right">
          <div className="btn-group">
            <a
              className="btn btn-xs btn-primary"
              onClick={() => updateItem({completed: false})}
              >
              <Icon icon="restore" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditingItem({item, updateItem}) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-xs-7">
          <input
            type="text"
            className="form-control input-md"
            value={item.name}
            onChange={({target: {value}}) => updateItem({name: value})}
            />
        </div>
        <div className="col-xs-5 text-right">
          <div className="btn-group">
            <a onClick={() => updateItem({editing: false})} className="btn btn-xs btn-success"><Icon icon="save" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}
