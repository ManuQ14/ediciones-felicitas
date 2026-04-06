const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ALLOWED_TYPES = {
  libros: /\.(jpg|jpeg|png|webp|gif)$/i,
  digital: /\.(pdf|epub)$/i,
};
const MAX_SIZE = { libros: 15 * 1024 * 1024, digital: 50 * 1024 * 1024 };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.params.type === 'digital' ? 'digital' : 'libros';
    const dest = path.join(__dirname, '../../uploads', type);
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const type = req.params.type === 'digital' ? 'digital' : 'libros';
  const allowed = ALLOWED_TYPES[type];
  if (allowed.test(path.extname(file.originalname))) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE.digital },
});

const uploadFile = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se recibió ningún archivo' });
  const type = req.params.type === 'digital' ? 'digital' : 'libros';
  res.json({ url: `/uploads/${type}/${req.file.filename}` });
};

module.exports = { upload, uploadFile };
