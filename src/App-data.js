let _uniqueId = 1;

export const uniqueId = () => _uniqueId++;

export const listsData = [
  {
    title: 'Party Supplies',
    items: [
      {
        name: "Some Item",
        completed: false,
        editing: false,
      },
      {
        name: "Editing Item...",
        completed: false,
        editing: true,
      },
      {
        name: "Another Item",
        completed: false,
        editing: false,
      },
      {
        name: "Completed Item",
        completed: true,
        editing: false,
      },
    ].map(item => ({...item, id: uniqueId()}))
  },
  {
    title: 'Around the House',
    items: [
      {
        name: "Sweep",
        completed: false,
        editing: false,
      },
      {
        name: "Clean",
        completed: false,
        editing: false,
      },
    ].map(item => ({...item, id: uniqueId()}))
  }
].map(list => ({...list, id: uniqueId()}));
