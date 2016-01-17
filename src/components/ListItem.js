import React, {Component} from 'react';
import { IconButton } from './Icon';
import EditingText from './EditingText';

const styles = {
  lineThrough: {
    textDecoration: 'line-through',
  },
};

function ListItem(props) {
  const {item} = props;
  const {completed} = item;

  const toggleCompleted = () => props.saveItem({completed: !completed});
  const handleSave = (name) => {
    props.saveItem({name});
    props.toggleEditing();
  };

  if (props.editing) return (
    <div className="list-group-item">
      <EditingText
        value={props.draft.name}
        onChange={name => props.updateDraft({name})}
        cancel={props.cancelEdit}
        save={handleSave}
        />
    </div>
  );

  return (
    <div className="list-group-item">
      <div className="row h5">
        <div className="col-xs-9">
          <div onDoubleClick={props.toggleEditing}>
            <IconButton icon="ok" color={completed ? 'muted' : 'success'} onClick={toggleCompleted} />
            <span style={completed ? styles.lineThrough : null}>
              {item.name}
            </span>
          </div>
        </div>
        <div className="col-xs-3 text-right">
          <IconButton icon="pencil" color="primary" onClick={props.toggleEditing} />
          <IconButton icon="remove" color="danger" onClick={props.deleteItem} />
        </div>
      </div>
    </div>
  );
}

class ListItemContainer extends Component {

  constructor(props) {
    super(props);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.state = {
      editing: false,
    }
  }

  toggleEditing() {
    this.setState({editing: !this.state.editing});
  }

  cancelEdit() {
    this.toggleEditing();
    this.props.updateDraft(this.props.item);
  }

  render() {
    const props = {
      editing: this.state.editing,
      toggleEditing: this.toggleEditing,
      cancelEdit: this.cancelEdit,
      ...this.props,
    };
    return <ListItem {...props} />
  }
}

export default ListItemContainer;
