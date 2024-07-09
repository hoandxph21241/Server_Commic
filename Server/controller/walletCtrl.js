// controllers/walletController.js
const walletModel = require('../models/walletModels');

// Hàm để xử lý yêu cầu lấy thông tin ví
async function getWalletInfo(req, res) {
    try {
        const { address } = req.params;
        const walletInfo = await walletModel.getWalletInfo(address);
        res.json(walletInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getWalletInfo,
};
