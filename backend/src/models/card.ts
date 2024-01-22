import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { linkRegex } from '../utils/constants';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: Array<ObjectId>,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

cardSchema.path('link').validate((val) => {
  const urlRegex = linkRegex;
  return urlRegex.test(val);
}, 'Invalid URL.');

export default mongoose.model('card', cardSchema);
