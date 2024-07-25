const express = require('express');
const router = express.Router();
const nftController = require('../controller/nftContronler');

router.get('/create', nftController.createUniqueAsset);
router.post('/create', nftController.createUniqueAsset);



module.exports = router;
