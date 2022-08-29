import express from 'express';
import {
  createItem,
  deleteItem,
  updateItem,
  deleteAll,
  getItemsJson,
} from '../controllers/item.js';
const router = express.Router();

router.route('/').get(getItemsJson).post(createItem);
router.route('/:id').get(deleteItem).patch(updateItem);
router.delete('/remove', deleteAll);

export default router;
