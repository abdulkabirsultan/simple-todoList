import mongoose from 'mongoose';

const { Schema } = mongoose;
const itemSchema = Schema(
  {
    title: String,
  },
  { timestamps: true }
);

export default mongoose.model('todoItem', itemSchema);
