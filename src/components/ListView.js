import React, {Component, createElement} from 'react';
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

const DRAFT_ID = 'DRAFT_ITEM';

function ListView(props) {
  const {
    list,
    updateList,
    deleteList,
    saveItem,
    deleteItem,
    addItem,
    drafts,
    updateDraft,
    showCompleted,
    toggleShowCompleted,
    navigateBack,
  } = props;

  const getDraft = id => _.find(drafts, {id}) || {id};

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
            item={{...item, ...getDraft(item.id)}}
            editItem={(data) => updateDraft(item.id, data)}
            saveItem={(data) => saveItem(item.id, data)}
            deleteItem={() => deleteItem(item.id)}
            />
        ))}

        <div className="list-group-item">
          <TextInput
            value={getDraft(DRAFT_ID).name}
            onChange={(name) => updateDraft(DRAFT_ID, {name})}
            cancel={() => updateDraft(DRAFT_ID, {name: ''})}
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

/**
 * A "Container" to house the brains and pass down simple props to ListView
 *  See Container Components for an idea of "why" https://medium.com/@learnreact/container-components-c0e67432e005#.yu8f80cg7
 *  This will also come in handy when it comes time to bring in Redux :)
 */
export default class ListViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts: [
        {id: DRAFT_ID, name: ''}
      ],
    }
  }

  updateDraft(id, data) {
    let {drafts} = this.state;
    if (!_.find(drafts, {id})) {
      drafts = drafts.concat([newItem({id})]);
    }
    drafts = drafts
      .map(draft => (draft.id !== id) ? draft : {...draft, ...data});
    this.setState({drafts});
  }

  clearDraft(id) {
    const drafts = this.state.drafts
      .filter(entry => entry.id !== id);
    this.setState({drafts});
  }

  addItem(data) {
    const {list, updateList} = this.props;
    apiClient.createListItem(list.id, newItem(data))
      .end((err, res) => {
        const item = res.body;
        const items = list.items.concat([item]);
        updateList({items});
        this.clearDraft(DRAFT_ID);
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
        this.clearDraft(id);
        updateList({items});
      });
  }

  render() {
    const {
      drafts,
    } = this.state;
    const {
      list,
      updateList,
      deleteList,
      showCompleted,
      toggleShowCompleted,
      navigateBack,
    } = this.props;

    // Rather than fiddling with JSX to pass down an object
    //  Example <ListView {...{list, updateList, /* ... */}} />
    // or
    //  Example <ListView list={list} updateList={updateList}, /* ... */}} />
    // We can make use of the fact that the JSX de-sugars to createElement which accepts props as the 2nd argument
    // See: https://facebook.github.io/react/docs/displaying-data.html#react-without-jsx
    return createElement(ListView, {
      list,
      updateList,
      deleteList,
      saveItem: this.saveItem.bind(this),
      deleteItem: this.deleteItem.bind(this),
      addItem: this.addItem.bind(this),
      drafts,
      updateDraft: this.updateDraft.bind(this),
      showCompleted,
      toggleShowCompleted,
      navigateBack,
    });

  }

}
