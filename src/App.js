import React, {Component} from 'react';
import _ from 'lodash';
import * as apiClient from './http/apiClient';
import {newList} from './factories';

import ListsView from './components/ListsView';
import ListView from './components/ListView';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.requestLists({});
    this.state = {
      activeListId: undefined,
      lists: [],
      showCompleted: true,
    }
  }

  requestLists(query) {
    apiClient.getLists({})
      .end((err, res) => {
        const lists = res.body;
        this.setState({lists})
      })
  }

  selectList(listId) {
    this.setState({activeListId: listId})
  }

  toggleShowCompleted() {
    this.setState({showCompleted: !this.state.showCompleted});
  }

  updateList(listId, data) {
    apiClient.updateList(listId, data)
      .end((err, res) => {
        const lists = this.state.lists
          .map(list => (list.id !== listId)
            ? list
            : {...list, ...data}
          );
        this.setState({lists});
      });
  }

  addList(data = {}) {
    apiClient.createList(newList(data))
      .end((err, res) => {
        const list = res.body;
        const lists = this.state.lists.concat([list]);
        this.setState({lists});
        this.selectList(list.id);
      });
  }

  deleteList(id) {
    apiClient.deleteList(id).end((err, res) => {
      const lists = this.state.lists.filter(list => list.id !== id);
      this.setState({lists});
    });
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
