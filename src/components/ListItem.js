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

  if (props.editing) return (
    <div className="list-group-item">
      <EditingText
        value={props.draft}
        onChange={props.updateDraft}
        cancel={props.toggleEditing}
        save={() => props.saveItem({name: props.draft})}
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
    this.state = {
      editing: false,
      draft: props.item.name,
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.updateDraft = this.updateDraft.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.item.name !== this.props.item.name) {
      this.setState({editing: false});
    }
  }

  toggleEditing() {
    this.setState({editing: !this.state.editing});
  }

  updateDraft(draft) {
    this.setState({draft});
  }

  render() {
    const props = {
      draft: this.state.draft,
      updateDraft: this.updateDraft,
      editing: this.state.editing,
      toggleEditing: this.toggleEditing,
      ...this.props,
    };
    return <ListItem {...props} />
  }
}

export default ListItemContainer;
