// routes/comicRoutes.js
const express = require('express');
const router = express.Router();
const comicController = require('../controller/comicController');

// Định nghĩa route để lấy dữ liệu truyện tranh
router.get('', comicController.getComics);

module.exports = router;
