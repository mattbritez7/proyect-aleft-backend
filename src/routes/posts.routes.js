const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/post');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: 'No autenticado' });
    const posts = await Post.find().sort({ createdAt: -1 }).populate('createdBy', 'username');
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al obtener posts' });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: 'No autenticado' });
    if (req.user.role !== 'administrador') return res.status(403).json({ msg: 'Solo administradores pueden crear posts' });
    if (!req.file && !req.body.text) return res.status(400).json({ msg: 'Debe proporcionar al menos una imagen o un texto' });

    const postData = {
      text: req.body.text || '',
      createdBy: req.user._id
    };
    if (req.file) postData.image = '/uploads/' + req.file.filename;
    const post = new Post(postData);
    await post.save();
    res.json({ status: 'post created', post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al crear el post' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: 'No autenticado' });
    if (req.user.role !== 'administrador') return res.status(403).json({ msg: 'Solo administradores pueden eliminar posts' });
    await Post.findByIdAndDelete(req.params.id);
    res.json({ status: 'post deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al eliminar el post' });
  }
});

module.exports = router;
