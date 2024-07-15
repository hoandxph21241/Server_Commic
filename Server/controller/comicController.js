// controllers/comicController.js
const axios = require('axios');

exports.getComics = async (req, res, next) => {
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


exports.getDetailComics = async (req, res, next) => {
    try {
            const response = await axios.get('https://sv1.otruyencdn.com/v1/api/chapter/6694da04c926626890a18aaf');
            const data = response.data.data;
    
            res.render('Comics/ReadComic', { data });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
};

