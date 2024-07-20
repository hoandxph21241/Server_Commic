const walletModel = require('../models/walletModels');
const axios = require("axios");
exports.getWalletInfo = async (req, res, next) => {
    try {
        const { address } = req.params;
        const walletInfo = await walletModel.getWalletInfo(address);
        res.json(walletInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.connectWallet = async (req, res, next) => {
    const PRIV_KEY = "0q9Ah3X8KCpZfxah-r";
    const wallet = req.params.id;

    if (!wallet) {
        return res.render('Profile/profile', {
            success: false,
            message: "Please connect your wallet.",
            solBalance: null,
            numTokens: 0,
            tokens: [],
            numNFTs: 0,
            nfts: []
        });
    }
    

    const myHeaders = {
        headers: {
            "x-api-key": PRIV_KEY
        }
    };
    try {
        const response = await axios.get(
            `https://api.shyft.to/sol/v1/wallet/get_portfolio?network=devnet&wallet=${wallet}`,
            myHeaders
        );
        const result = response.data;
        if (!result.result || !result.result.sol_balance || !result.result.tokens || !result.result.nfts) {
            throw new Error("Unexpected response structure from API");
        }

        res.render('Profile/profile', {
            success: result.success,
            message: result.message,
            solBalance: result.result.sol_balance,
            numTokens: result.result.num_tokens,
            tokens: result.result.tokens,
            numNFTs: result.result.num_nfts,
            nfts: result.result.nfts,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred");
    }
};

