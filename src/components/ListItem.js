import React from 'react';
import { IconButton } from './Icon';
import TextInput from './TextInput';

const styles = {
  lineThrough: {
    textDecoration: 'line-through',
  },
};

export default function ListItem(props) {
  const {item, editItem, saveItem, deleteItem} = props;
  const {editing, completed} = item;

  const toggleEditing = () => saveItem({editing: !editing});
  const toggleCompleted = () => saveItem({completed: !completed});
  const handleSave = (name) => saveItem({name, editing: false});

  if (editing) return (
    <div className="list-group-item">
      <TextInput
        value={item.name}
        onChange={value => editItem({name: value})}
        cancel={toggleEditing}
        save={handleSave}
        />
    </div>
  );

  return (
    <div className="list-group-item">
      <div className="row h5">
        <div className="col-xs-9">
          <div onDoubleClick={toggleEditing}>
            <IconButton icon="ok" color={completed ? 'muted' : 'success'} onClick={toggleCompleted} />
            <span style={completed ? styles.lineThrough : null}>
              {item.name}
            </span>
          </div>
        </div>
        <div className="col-xs-3 text-right">
          <IconButton icon="pencil" color="primary" onClick={toggleEditing} />
          <IconButton icon="remove" color="danger" onClick={deleteItem} />
        </div>
      </div>
    </div>
  );
}
