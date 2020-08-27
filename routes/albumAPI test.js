const http = require('http')
const path = require('path')
const express = require('express')
//是nodejs中處理multipart/form-data資料格式(主要用在上傳功能中)的中介軟體
//文件：https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
const multer = require('multer')
const app = express()
//配置express的靜態目錄
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
res.sendFile(__dirname '/index.html')
})
//配置diskStorage來控制檔案儲存的位置以及檔名字等
var storage = multer.diskStorage({
//確定圖片儲存的位置
destination: function (req, file, cb){
cb(null, './public/uploadImgs')
},
![](http://images2017.cnblogs.com/blog/1283058/201802/1283058-20180201154342296-515041615.png)
//確定圖片儲存時的名字,注意，如果使用原名，可能會造成再次上傳同一張圖片的時候的衝突
filename: function (req, file, cb){
cb(null, Date.now() file.originalname)
}
});
//生成的專門處理上傳的一個工具，可以傳入storage、limits等配置
var upload = multer({storage: storage});
//接收上傳圖片請求的介面
app.post('/upload', upload.single('file'), function (req, res, next) {
//圖片已經被放入到伺服器裡,且req也已經被upload中介軟體給處理好了（加上了file等資訊）
//線上的也就是伺服器中的圖片的絕對地址
var url = '/uploadImgs/'   req.file.filename
res.json({
code : 200,
data : url
})
});
http.createServer(app).listen(3000,()=>{
console.log('server is listening')
})

module.exports = router;
