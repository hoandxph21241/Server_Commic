const express = require('express');
const router = express.Router();
const comicController = require('../controller/comicController');

// Định nghĩa route để lấy dữ liệu truyện tranh
router.get('', comicController.getComics);

router.get('/readcomics', comicController.getDetailComics);

module.exports = router;
