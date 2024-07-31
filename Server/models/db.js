const mongoose = require('mongoose');
//connect

mongoose.connect('mongodb://127.0.0.1/Server_Comic')
.then(()=>{
    console.log("Đã Kết Nối ");
})
.catch((err) => {
    console.log("loi ket noi csdl");
    console.log('err');
});
module.exports = {mongoose}
