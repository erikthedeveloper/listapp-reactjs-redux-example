import React, {Component} from 'react';
import _ from 'lodash';
import * as apiClient from '../http/apiClient';
import {newItem} from '../factories';
import {ListHeader} from './Header';
import ListItem from './ListItem';
import TextInput from './TextInput';

const styles = {
  footerLink: {
    bottom: 15,
    width: '100%',
    position: 'fixed',
    textAlign: 'center',
  },
};

export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingItems: [
        {id: 'DRAFT', name: ''}
      ],
    }
  }

  editDraft(id, data) {
    let {editingItems} = this.state;
    if (!_.find(editingItems, {id})) {
      editingItems = editingItems.concat([newItem({id})]);
    }
    editingItems = editingItems.map(entry => entry.id !== id
      ? entry
      : {...entry, ...data}
    );
    this.setState({editingItems});
  }

  clearDraft(id) {
    const editingItems = this.state.editingItems
      .filter(entry => entry.id !== id);
    this.setState({editingItems});
  }

  getEditItem(id) {
    return _.find(this.state.editingItems, {id}) || {id};
  }

  render() {
    const {
      list,
      updateList,
      deleteList,
      showCompleted,
      toggleShowCompleted,
      navigateBack,
    } = this.props;

    const addItem = (data) => {
      apiClient.createListItem(list.id, newItem(data))
        .end((err, res) => {
          const item = res.body;
          const items = list.items.concat([item]);
          updateList({items});
          this.clearDraft('DRAFT');
        })
    };

    const deleteItem = (id) => {
      apiClient.deleteListItem(list.id, id)
        .end((err, res) => {
          const items = list.items.filter(item => item.id !== id);
          updateList({items});
        });
    };

    const saveItem = (id, data) => {
      apiClient.updateListItem(list.id, id, data)
        .end((err, res) => {
          const items = list.items
            .map(item => (item.id !== id)
              ? item
              : {...item, ...res.body}
            );
          this.clearDraft(id);
          updateList({items});
        });
    };

    const visibleItems = (showCompleted)
      ? list.items
      : list.items.filter(item => !item.completed);

    return (
      <div>
        <ListHeader {...{list, updateList, deleteList, navigateBack}} />

        <div className="list-group">
          {visibleItems.map(item => (
            <ListItem
              key={item.id}
              item={{...item, ...this.getEditItem(item.id)}}
              editItem={(data) => this.editDraft(item.id, data)}
              saveItem={(data) => saveItem(item.id, data)}
              deleteItem={() => deleteItem(item.id)}
              />
          ))}

          <div className="list-group-item">
            <TextInput
              value={this.getEditItem('DRAFT').name}
              onChange={(name) => this.editDraft('DRAFT', {name})}
              cancel={() => this.editDraft('DRAFT', {name: ''})}
              save={(name) => addItem({name})}
              />
          </div>
        </div>

        <a onClick={toggleShowCompleted} style={styles.footerLink}>
          {showCompleted ? 'hide' : 'show'} completed
        </a>
      </div>
    );

  }

}
