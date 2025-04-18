import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Auth route disabled' });
});

export default router;