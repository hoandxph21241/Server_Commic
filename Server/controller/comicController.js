// controllers/comicController.js
const axios = require('axios');

const getComics = async (req, res) => {
    try {
        const response = await axios.get('https://otruyenapi.com/v1/api/home');
        const data = response.data;

        // Kiểm tra dữ liệu
        if (!data || !data.data || !data.data.items) {
            throw new Error('Invalid data from API');
        }

        // Render view với dữ liệu truyện tranh
        res.render('Home/Home', { title: 'Danh sách truyện tranh', comics: data.data.items });
    } catch (error) {
        console.error('Error fetching comics:', error);
        res.status(500).json({ error: 'Error fetching comics' });
    }
};

module.exports = { getComics };
