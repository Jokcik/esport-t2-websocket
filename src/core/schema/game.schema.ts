import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
  title: String,
  name: String,
});

