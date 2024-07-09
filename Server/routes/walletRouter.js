// routes/walletRoutes.js
const express = require('express');
const router = express.Router();
const walletController = require('../controller/walletCtrl');

// Định nghĩa tuyến đường để lấy thông tin ví
router.get('/:address', walletController.getWalletInfo);

module.exports = router;
