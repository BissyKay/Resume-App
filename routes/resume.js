const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database/db');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload resume
router.post('/upload', upload.single('resume'), (req, res) => {
  const { userId, content } = req.body;
  const filePath = req.file.path;

  db.run(
    'INSERT INTO resumes (user_id, file_name, file_path, content) VALUES (?, ?, ?, ?)',
    [userId, req.file.originalname, filePath, content],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to upload resume' });
      res.json({ message: 'Resume uploaded successfully' });
    }
  );
});

// Get user resumes
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  db.all('SELECT * FROM resumes WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch resumes' });
    res.json(rows);
  });
});

module.exports = router;
