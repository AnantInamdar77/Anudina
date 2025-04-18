import express from 'express';
import multer from 'multer';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import News from '../models/News.js';

const __dirname = fileURLToPath(import.meta.url);

const router = express.Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../Uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    console.error('Get news error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const { title, meta, content, category, videoUrl } = req.body;
  const image = req.file ? req.file.filename : '';

  try {
    const news = new News({ title, meta, image, content, category, videoUrl });
    await news.save();
    res.json(news);
  } catch (err) {
    console.error('Create news error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ msg: 'News not found' });
    }
    await news.deleteOne();
    res.json({ msg: 'News deleted' });
  } catch (err) {
    console.error('Delete news error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;