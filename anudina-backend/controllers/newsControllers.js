import News from '../models/News.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractVideoId = (url) => {
  if (!url) return '';
  if (url.length === 11 && !url.includes('/') && !url.includes('.')) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
};

export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ msg: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'News not found' });
    }
    res.status(500).send('Server Error');
  }
};

export const getNewsByCategory = async (req, res) => {
  try {
    const news = await News.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, meta, content, category, videoUrl } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload an image' });
    }

    const videoId = extractVideoId(videoUrl);

    const newNews = new News({
      title,
      meta,
      content,
      category: category || 'general',
      videoUrl,
      videoId,
      image: `/uploads/${req.file.filename}`,
    });

    const news = await newNews.save();
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateNews = async (req, res) => {
  try {
    const { title, meta, content, category, videoUrl } = req.body;

    let news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ msg: 'News not found' });
    }

    const updateFields = {
      title: title || news.title,
      meta: meta || news.meta,
      content: content || news.content,
      category: category || news.category,
      videoUrl: videoUrl || news.videoUrl,
      videoId: videoUrl ? extractVideoId(videoUrl) : news.videoId,
    };

    if (req.file) {
      if (news.image && news.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', news.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateFields.image = `/uploads/${req.file.filename}`;
    }

    news = await News.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ msg: 'News not found' });
    }

    if (news.image && news.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', news.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await news.remove();
    res.json({ msg: 'News removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'News not found' });
    }
    res.status(500).send('Server Error');
  }
};
