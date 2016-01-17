import React, {Component} from 'react';
import Icon from './Icon';
import EditingText from './EditingText';

export function ListsHeader() {
  return (
    <Header title="ListApp" />
  );
}

function ListHeaderShell(props) {
  const {list, editing, toggleEditing, draft, updateDraft} = props;
  const navLeft = (
    <Icon
      icon={editing ? 'trash' : 'chevron-left'}
      onClick={editing ? props.deleteList : props.navigateBack}
      />
  );
  const navTitle = !editing ? (
    <span onDoubleClick={toggleEditing}>{list.title}</span>
  ) : (
    <EditingText
      value={draft}
      onChange={updateDraft}
      save={() => props.updateList({title: draft})}
      cancel={toggleEditing}
      />
  );
  const navRight = (
    <Icon
      icon={editing ? 'floppy-save' : 'pencil'}
      onClick={toggleEditing}
      style={{fontSize: 24, paddingRight: 15}}
      />
  );

  return (
    <Header left={navLeft} title={navTitle} right={navRight} />
  )
}

export class ListHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      draft: props.list.title,
      editing: false,
    };
    this.updateDraft = this.updateDraft.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.list.title !== this.props.list.title) {
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
    return (
      <ListHeaderShell
        draft={this.state.draft}
        updateDraft={this.updateDraft}
        editing={this.state.editing}
        toggleEditing={this.toggleEditing}
        {...this.props}
        />
    );
  }
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
