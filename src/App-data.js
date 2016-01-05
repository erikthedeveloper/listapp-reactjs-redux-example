let _uniqueId = 1;

export const uniqueId = () => _uniqueId++;

export const newList = (data) => ({
  id: uniqueId(),
  title: '[NEW LIST]',
  items: [],
  editing: !data.title,
  ...data,
});

export const newItem = (data) => ({
  id: uniqueId(),
  name: '[TODO]',
  completed: false,
  editing: !data.name,
  ...data,
});

export const listsData = [
  newList({
    title: 'Party Supplies',
    items: [
      newItem({name: 'Some Item'}),
      newItem({name: 'Editing Item...', editing: true}),
      newItem({name: 'Another Item'}),
      newItem({name: 'Completed Item', completed: true}),
    ]
  }),
  newList({
    title: 'Around the House',
    items: [
      newItem({name: 'Sweep'}),
      newItem({name: 'Clean'}),
    ]
  }),
];
