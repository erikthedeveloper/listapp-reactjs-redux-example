'use strict';

let _uniqueId = 1;

const uniqueId = () => _uniqueId++;

const newList = (data) => Object.assign({
  id: uniqueId(),
  title: '[NEW LIST]',
  items: [],
  editing: !data.title,
}, data);

const newItem = (data) => Object.assign({
  id: uniqueId(),
  listId: undefined,
  name: '[TODO]',
  completed: false,
  editing: !data.name,
}, data);

const lists = [
  newList({title: 'Party Supplies'}),
  newList({title: 'Around the House'}),
];

let items = [];
const addListId = listId => item => Object.assign({}, item, {listId});
items = items.concat([
  newItem({name: 'Some Item'}),
  newItem({name: 'Editing Item...'}),
  newItem({name: 'Another Item'}),
  newItem({name: 'Completed Item', completed: true}),
].map(addListId(lists[0].id)));
items = items.concat([
  newItem({name: 'Go Shopping'}),
  newItem({name: 'Rake Leaves'}),
].map(addListId(lists[1].id)));

module.exports = function() {
  return {
    lists,
    items
  };
};
