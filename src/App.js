import React, {Component} from 'react';
import _ from 'lodash';
import {listsData, uniqueId} from './App-data';

const styles = {
  largeIcon: {
    fontSize: 32,
  },
  fixedPlusBtn: {
    bottom: 20,
    right: 25,
    position: 'fixed',
  },
}

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

  updateListItem(listId, itemId, data) {
    const lists = this.state.lists.map(list => (list.id !== listId)
      ? list
      : {
        ...list,
        items: list.items.map(item => (item.id !== itemId)
          ? item
          : {...item, ...data}
        )
      }
    );

    this.setState({lists});
  }

  deleteListItem(listId, itemId, data) {
    const lists = this.state.lists.map(list => (list.id !== listId)
      ? list
      : {
        ...list,
        items: list.items.filter(item => (item.id !== itemId))
      }
    );

    this.setState({lists});
  }

  addListItem(listId, data = {}) {
    const blankListItem = {
      id: uniqueId(),
      name: '[TODO]',
      completed: false,
      editing: true
    }
    const lists = this.state.lists.map(list => (list.id !== listId)
      ? list
      : {
        ...list,
        items: list.items.concat([{...blankListItem, ...data}])
      }
    );

    this.setState({lists});
  }

  addList(data = {}) {
    const blankList = {
      id: uniqueId(),
      title: '[NEW LIST]',
      items: []
    }
    this.setState({
      lists: this.state.lists.concat([{...blankList, ...data}])
    })
  }

  render() {
    const {
      activeListId,
      lists,
      showCompleted,
    } = this.state;

    console.log(this.state);

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
        addItem={(data) => this.addListItem(list.id, data)}
        updateItem={(itemId, data) => this.updateListItem(list.id, itemId, data)}
        deleteItem={(itemId) => this.deleteListItem(list.id, itemId)}
        showCompleted={showCompleted}
        toggleShowCompleted={() => this.setState({showCompleted: !showCompleted})}
        navigateBack={listId => this.selectList()}
        />
    )
  }
}

function HeaderNav({left, title, right}) {
  return (
    <nav className="navbar navbar-default navbar-static-top" style={{marginBottom: 0}}>
      <div className="row">
        <div className="col-xs-3">
          <div className="navbar-brand">
            {left}
          </div>
        </div>
        <div className="col-xs-6">
          <h4 className="navbar-text text-center">{title}</h4>
        </div>
        <div className="col-xs-3 text-right">
          <div className="navbar-text">
            {right}
          </div>
        </div>
      </div>
    </nav>
  )
}

function ListsView(props) {
  const {lists, selectList, addList} = props;
  return (
    <div>
      <HeaderNav title="ListApp" />

      <div className="list-group">
        {lists.map(list => {
          const numCompleted = list.items.filter(item => item.completed).length;
          return (
            <div key={list.id} className="list-group-item">
              <div className="pull-right">
                <Icon
                  icon="keyboard_arrow_right"
                  onClick={() => selectList(list.id)}
                  style={{fontSize: 48}}
                  />
              </div>
              <h4 className="list-group-item-heading">{list.title}</h4>
              <p className="list-group-item-text">
                {numCompleted} of {list.items.length} complete
              </p>
            </div>
          );
        })}
      <FixedPlusBtn onClick={addList} />
    </div>
  </div>
  )
}

function FixedPlusBtn({onClick}) {
  return (
    <a style={styles.fixedPlusBtn} onClick={onClick}>
      <Icon icon="add" style={{fontSize: 48}} />
    </a>
  )
}

function ListView(props) {
  const {
    list,
    addItem,
    showCompleted,
    toggleShowCompleted,
    navigateBack,
  } = props;

  const items = (showCompleted)
    ? list.items
    : list.items.filter(item => !item.completed);

  const navLeft = (
    <Icon
      icon="keyboard_arrow_left"
      onClick={navigateBack}
      style={styles.largeIcon}
      />
  );
  const navRight = (
    <Icon
      icon="mode_edit"
      style={{paddingRight: 15}}
      />
  );

  return (
    <div>
      <HeaderNav left={navLeft} title={list.title} right={navRight} />

      <div className="list-group">
        {items.map(item => {
          const updateItem = (data) => props.updateItem(item.id, data);
          const deleteItem = () => props.deleteItem(item.id);
          if (item.completed) return (
            <CompletedItem key={item.id} item={item} updateItem={updateItem} />
          )
          if (item.editing) return (
            <EditingItem key={item.id} item={item} updateItem={updateItem} />
          )
          return (
            <Item key={item.id} item={item} updateItem={updateItem} deleteItem={deleteItem} />
          )
        })}
      </div>

      <a onClick={addItem} style={styles.fixedPlusBtn}>
        <Icon icon="add" style={{fontSize: 48}} />
      </a>
      <a
        onClick={toggleShowCompleted}
        style={{bottom: 15, width: '100%', position: 'fixed', textAlign: 'center'}}>
        {showCompleted ? 'hide' : 'show'} completed
      </a>
    </div>
  )
}

function Item({item, updateItem, deleteItem}) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-xs-7">
          <span className="h5">{item.name}</span>
        </div>
        <div className="col-xs-5 text-right">
          <div className="btn-group">
            <a onClick={() => updateItem({completed: true})} className="btn btn-xs btn-success"><Icon icon="done" /></a>
            <a onClick={deleteItem} className="btn btn-xs btn-danger"><Icon icon="delete" /></a>
            <a onClick={() => updateItem({editing: true})} className="btn btn-xs btn-primary"><Icon icon="mode_edit" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompletedItem({item, updateItem}) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-xs-7" style={{opacity: '0.7'}}>
          <s><span className="h5">{item.name}</span></s>
        </div>
        <div className="col-xs-5 text-right">
          <div className="btn-group">
            <a
              className="btn btn-xs btn-primary"
              onClick={() => updateItem({completed: false})}
              >
              <Icon icon="restore" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditingItem({item, updateItem}) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-xs-7">
          <input
            type="text"
            className="form-control input-md"
            value={item.name}
            onChange={({target: {value}}) => updateItem({name: value})}
            />
        </div>
        <div className="col-xs-5 text-right">
          <div className="btn-group">
            <a onClick={() => updateItem({editing: false})} className="btn btn-xs btn-success"><Icon icon="save" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Icon({icon, ...otherProps}) {
  return (
    <i className="material-icons" {...otherProps}>{icon}</i>
  )
}
