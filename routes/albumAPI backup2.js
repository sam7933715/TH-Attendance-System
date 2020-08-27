var express = require('express');
var router = express.Router();
var multer = require('multer');


//membermode transfer to here
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ex6-4-2',{useNewUrlParser:true});

var memberSchema = new mongoose.Schema({
    name:String,
    account:String,
    password:String,
    photos:[]
});
memberSchema.set('collection','member1')
var model1 =mongoose.model('member1',memberSchema);

//Router
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/photos');
    },
    filename:function(req,file,cb){
        var str = file.originalname.split('.');
        cb(null,Date.now()+'.'+str[1]);
    }
});
var upload = multer({storage:storage});


//photo upload
// router.post("/upload",upload.single("file"),function(req,res,next){
router.post("/upload",upload.single("progressbarTW_img"),function(req,res,next){
    var newmember = new model1({
        name: req.body.name,
        account: req.body.account,
        password: req.body.password,
        photos:req.file.filename
        // photos:req.body.photos
    });
        newmember.save(function(err,data){
            if(err){
                res.json({"status":1,"msg":"error"});
                console.log("add photo error");
            }
            else{
                res.json({"status":0,"msg":"success","data":data});
                console.log("add photo success");
            }
        });
});

//一般post 方法用來驗證資料庫連接
// router.post("/upload",upload.single("file"),function(req,res){
//     var newlist={
//         title:req.body.title,
//         content:req.body.content
//     };
//     res.json({"ststus":0,"msg":'success',"data":newlist});
// });


module.exports = router;
