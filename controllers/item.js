import TodoItems from '../models/item.js';

export const getItems = async (req, res) => {
  const items = (await TodoItems.find()) || ['Item 3', 'Item 2', 'Item 1'];
  res.render('todoList', {
    items: items.reverse(),
    length: items?.length,
  });
};

export const createItem = async (req, res) => {
  const { title } = req.body;
  if (title) {
    await TodoItems.create({ title });
  }
  res.redirect('/');
};
export const getItemsJson = async (req, res) => {
  const items = await TodoItems.find();
  res.json(items);
};
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  await TodoItems.findByIdAndDelete(id);
  res.redirect('/');
};
export const updateItem = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  await TodoItems.findByIdAndUpdate(id, { title });
  res.redirect('/');
};

export const deleteAll = async (req, res) => {
  await TodoItems.deleteMany({});
  res.redirect('/');
};
