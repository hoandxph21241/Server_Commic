const walletModel = require('../models/walletModels');

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
