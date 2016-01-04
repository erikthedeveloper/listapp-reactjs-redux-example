import React, {Component} from 'react';
import _ from 'lodash';
import {listsData, newList} from './App-data';

import ListsView from './components/ListsView';
import ListView from './components/ListView';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeListId: undefined,
      lists: listsData,
      showCompleted: true,
    }
  }

  selectList(listId) {
    this.setState({activeListId: listId})
  }

  toggleShowCompleted() {
    this.setState({showCompleted: !this.state.showCompleted});
  }

  updateList(listId, data) {
    const lists = this.state.lists
      .map(list => (list.id !== listId)
        ? list
        : {...list, ...data}
      );
    this.setState({lists});
  }

  addList(data = {}) {
    const lists = this.state.lists.concat([newList(data)]);
    this.setState({lists});
  }

  deleteList(id) {
    const lists = this.state.lists.filter(list => list.id !== id);
    this.setState({lists});
  }

  render() {
    const {
      activeListId,
      lists,
      showCompleted,
    } = this.state;

    if (!activeListId) return (
      <ListsView
        lists={lists}
        selectList={listId => this.selectList(listId)}
        addList={() => this.addList()}
        />
    )

    const list = _.find(lists, {id: activeListId});

    return (
      <ListView
        list={list}
        updateList={(data) => this.updateList(list.id, data)}
        deleteList={() => {
          this.selectList();
          this.deleteList(list.id);
        }}
        showCompleted={showCompleted}
        toggleShowCompleted={() => this.toggleShowCompleted()}
        navigateBack={listId => this.selectList()}
        />
    )
  }
}
