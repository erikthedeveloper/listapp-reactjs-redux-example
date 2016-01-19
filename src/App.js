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
    const {props} = this;
    const list = _.find(props.lists, {id: props.activeListId});

    if (!list) return (
      <ListsView
        lists={props.lists}
        selectList={props.selectList}
        addList={() => props.addList({})}
        />
    );

    return (
      <ListView
        list={list}
        updateList={(data) => props.updateList(list.id, data)}
        deleteList={() => {
          props.selectList();
          props.deleteList(list.id);
        }}
        navigateBack={()=> props.selectList()}
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
    };
    this.requestLists = this.requestLists.bind(this);
    this.addList = this.addList.bind(this);
    this.updateList = this.updateList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.selectList = this.selectList.bind(this);
  }

  selectList(listId) {
    this.setState({activeListId: listId})
  }

  requestLists() {
    apiClient.getLists()
      .end((err, res) => {
        const lists = res.body;
        this.setState({lists})
      })
  }

  updateList(listId, data) {
    // TODO: This is TEMP to prevent sending excessive API calls for item related operations
    // Long story short... this needs to be revisited and gut out :)
    const patchListsState = () => {
      const lists = this.state.lists
        .map(list => (list.id !== listId) ? list : {...list, ...data});
      this.setState({lists});
    };

    const {title} = data;
    if (title) {
      apiClient.updateList(listId, {title})
        .end(patchListsState);
    } else {
      patchListsState();
    }
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
    } = this.state;

    return createElement(App, {
      activeListId,
      selectList: this.selectList,
      lists,
      requestLists: this.requestLists,
      addList: this.addList,
      updateList: this.updateList,
      deleteList: this.deleteList,
    });

  }
}
