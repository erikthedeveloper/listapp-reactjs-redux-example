import React, {Component} from 'react';
import * as apiClient from '../http/apiClient';
import {newItem} from '../factories';
import {ListHeader} from './Header';
import ListItem from './ListItem';
import EditingText from './EditingText';

const styles = {
  footerLink: {
    bottom: 15,
    width: '100%',
    position: 'fixed',
    textAlign: 'center',
  },
};

function ListView(props) {
  const {
    list,
    updateList,
    deleteList,
    navigateBack,
  } = props;

  const visibleItems = (props.showCompleted)
    ? list.items
    : list.items.filter(item => !item.completed);

  return (
    <div>
      <ListHeader {...{list, updateList, deleteList, navigateBack}} />

      <div className="list-group">
        {visibleItems.map(item => {
          return (
            <ListItem
              key={item.id}
              item={item}
              saveItem={(data) => props.saveItem(item.id, data)}
              deleteItem={() => props.deleteItem(item.id)}
              />
          );
        })}

        <div className="list-group-item">
          <EditingText
            value={props.itemDraft}
            onChange={props.updateItemDraft}
            save={() => props.addItem({name: props.itemDraft})}
            cancel={() => props.updateItemDraft('')}
            />
        </div>
      </div>

      <a onClick={props.toggleShowCompleted} style={styles.footerLink}>
        {props.showCompleted ? 'hide' : 'show'} completed
      </a>
    </div>
  );
}

/**
 * A "Container" to house the brains and pass down simple props to ListView
 *  See Container Components for an idea of "why" https://medium.com/@learnreact/container-components-c0e67432e005#.yu8f80cg7
 *  This will also come in handy when it comes time to bring in Redux :)
 */
export default class ListViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCompleted: true,
      editingList: false,
      itemDraft: '',
    };

    this.saveItem = this.saveItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggleShowCompleted = this.toggleShowCompleted.bind(this);
    this.toggleEditingList = this.toggleEditingList.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.list.items.length > this.props.list.items.length) {
      this.updateItemDraft('');
    }
  }

  updateItemDraft(itemDraft) {
    this.setState({itemDraft})
  }

  toggleShowCompleted() {
    this.setState({showCompleted: !this.state.showCompleted});
  }

  toggleEditingList() {
    this.setState({editingList: !this.state.editingList});
  }

  addItem(data) {
    const {list, updateList} = this.props;
    apiClient.createListItem(list.id, newItem(data))
      .end((err, res) => {
        const item = res.body;
        const items = list.items.concat([item]);
        updateList({items});
      })
  }

  deleteItem(id) {
    const {list, updateList} = this.props;
    apiClient.deleteListItem(list.id, id)
      .end((err, res) => {
        const items = list.items.filter(item => item.id !== id);
        updateList({items});
      });
  }

  saveItem(id, data) {
    const {list, updateList} = this.props;
    apiClient.updateListItem(list.id, id, data)
      .end((err, res) => {
        const items = list.items
          .map(item => (item.id !== id)
            ? item
            : {...item, ...res.body}
          );
        updateList({items});
      });
  }

  render() {
    const {showCompleted, editingList} = this.state;

    const props = {
      showCompleted,
      toggleShowCompleted: this.toggleShowCompleted,
      editingList,
      toggleEditingList: this.toggleEditingList,
      saveItem: this.saveItem,
      deleteItem: this.deleteItem,
      addItem: this.addItem,
      itemDraft: this.state.itemDraft,
      updateItemDraft: this.updateItemDraft.bind(this),
      ...this.props,
    };

    return <ListView {...props} />;
  }

}
