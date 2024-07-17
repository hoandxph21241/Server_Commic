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


exports.getReadComics = async (req, res, next) => {
    try {
        let idComics = req.params.idComics
            const api = "https://sv1.otruyencdn.com/v1/api/chapter/"+idComics
            const response = await axios.get(api);
            const data = response.data.data;
           
    
            res.render('Comics/ReadComic', { data });
            console.log(api);
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
};

exports.getDetailComics = async (req, res, next) => {
    try {
        let slug = req.params.slug;
        let title,breadcrumb;

            const api = 'https://otruyenapi.com/v1/api/truyen-tranh/'+ slug
            const response = await axios.get(api);
            const data = response.data.data;
    
            res.render('Comics/DetailComic', { 
                title: data.seoOnPage.titleHead, 
                comic: data.item,
                breadcrumb: data.breadCrumb
              });
              console.log(api);
              console.log(title,breadcrumb)
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
};

