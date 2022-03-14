import { Schema, model } from 'mongoose';

interface Blog {
  title: string;
  content: string;
  date: Date;
}

const schema = new Schema<Blog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true }
});

export default model<Blog>('Blog', schema);