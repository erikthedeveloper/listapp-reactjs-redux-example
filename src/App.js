import React, {Component, createElement} from 'react';
import _ from 'lodash';
import * as apiClient from './http/apiClient';
import {newList} from './factories';

import ListsView from './components/ListsView';
import ListView from './components/ListView';

class App extends Component {

  componentDidMount() {
    this.props.requestLists();
  }

  render() {
    const {
      lists,
      activeListId,
      showCompleted,
      addList,
      updateList,
      deleteList,
      selectList,
      toggleShowCompleted,
    } = this.props;

    const list = _.find(lists, {id: activeListId});

    if (!list) return (
      <ListsView
        lists={lists}
        selectList={selectList}
        addList={() => addList({})}
        />
    );

    return (
      <ListView
        list={list}
        updateList={(data) => updateList(list.id, data)}
        deleteList={() => {
          selectList();
          deleteList(list.id);
        }}
        showCompleted={showCompleted}
        toggleShowCompleted={toggleShowCompleted}
        navigateBack={()=> selectList()}
        />
    )
  }

}

export default class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeListId: undefined,
      lists: [],
      showCompleted: true,
    }
  }

  selectList(listId) {
    this.setState({activeListId: listId})
  }

  toggleShowCompleted() {
    this.setState({showCompleted: !this.state.showCompleted});
  }

  requestLists() {
    apiClient.getLists()
      .end((err, res) => {
        const lists = res.body;
        this.setState({lists})
      })
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

    const list = _.find(lists, {id: activeListId});

    return createElement(App, {
      lists,
      requestLists: this.requestLists.bind(this),
      activeListId,
      showCompleted,
      addList: this.addList.bind(this),
      updateList: this.updateList.bind(this),
      deleteList: this.deleteList.bind(this),
      selectList: this.selectList.bind(this),
      toggleShowCompleted: this.toggleShowCompleted.bind(this),
    });

  }
}
