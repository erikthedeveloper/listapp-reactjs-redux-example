export const newList = (data) => ({
  title: '[NEW LIST]',
  items: [],
  editing: !data.title,
  ...data,
});

export const newItem = (data) => ({
  name: '[TODO]',
  completed: false,
  editing: !data.name,
  ...data,
});
