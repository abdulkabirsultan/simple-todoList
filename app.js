import * as dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express from 'express';
import connect from './config/connect.js';

//Route Middlewares
import errorHandler from './middlewares/errorHandlerMiddleware.js';
import notFound from './middlewares/notFound.js';
import itemRoutes from './routes/item.js';
import { deleteAll, getItems } from './controllers/item.js';

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.set('view engine', 'ejs');

// Routes
app.use('/todo', itemRoutes);
app.get('/', getItems);

//Route MiddleWares
app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 5000;
const start = async () => {
  await connect();
  app.listen(port, console.log(`Server started on port ${port}`));
};
start();

/* 

const express = require('express');
const bodyParser = require('body-parser');
const { getDate, getDay } = require(`${__dirname}/date.js`);
const mongoose = require('mongoose');
const app = express();
const _ = require('lodash');
mongoose.connect('mongodb://localhost:27017/todoListDB');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const itemSchema = {
  name: String,
};
const Item = mongoose.model('item', itemSchema);
const item1 = new Item({
  name: 'Welcome to your todoList',
});
const item2 = new Item({
  name: 'Hit the + button to add a new item',
});
const item3 = new Item({
  name: '<= hit this to delete an item',
});

const defaultItems = [item1, item2, item3];

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];
const day = getDate();
app.get('/', (req, res) => {
  Item.find((err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (!err) {
          console.log('successfully added the items into the database');
        }
      });
      res.redirect('/');
    } else {
      res.render('list', { listTitle: day, newListItems: foundItems });
    }
  });
});

app.post('/', (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName,
  });
  if (itemName === '') {
    console.log('nothing to save');
  } else {
    if (listName == day) {
      newItem.save();
      res.redirect('/');
    } else {
      List.findOne({ name: listName }, (err, foundItem) => {
        foundItem.items.push(newItem);
        foundItem.save();
        res.redirect('/' + listName);
      });
    }
  }

  // if (req.body.button == "Work list") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   if (item === "") {
  //   } else {
  //     items.push(item);
  //   }
  //   res.redirect("/");
  // }
});

// app.get("/work", function (req, res) {
//   res.render("test", { listTitle: "Work list", item: workItems });
// });
// app.post("/work", function (req, res) {
//   const item = req.body.item;

//   if (item === "") {
//   } else {
//     workItems.push(item);
//   }
// });
app.get('/about', function (req, res) {
  res.render('about');
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});
const List = mongoose.model('list', listSchema);

app.get('/:customListTitle', (req, res) => {
  const customList = _.capitalize(req.params.customListTitle);

  const list = new List({
    name: customList,
    items: defaultItems,
  });
  List.findOne({ name: customList }, (err, result) => {
    if (!result) {
      list.save();
      res.redirect(`/${customList}`);
    } else {
      res.render('list', { listTitle: customList, newListItems: result.items });
    }
  });
});
app.post('/delete', (req, res) => {
  const removedCheck = req.body.checkbox;
  const listName = req.body.listName;
  if (listName == day) {
    Item.findByIdAndRemove(removedCheck, (err) => {
      console.log('removed item successfully');
    });
    Item.find((err, foundItems) => {
      if (foundItems.length === 0) {
        console.log('completely cleared');
      }
    });
    res.redirect('/');
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: removedCheck } } },
      (err, foundItems) => {
        !err ? res.redirect('/' + listName) : console.log('not found');
      }
    );
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
 */
