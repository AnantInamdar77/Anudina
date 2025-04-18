import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  meta: { type: String, required: true },
  image: { type: String },
  content: { type: String, required: true },
  category: { type: String, default: 'general' },
  videoUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model('News', newsSchema);

export default News;