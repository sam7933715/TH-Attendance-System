var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/photos');
    },
    filename:function(req,file,cb){
        var str = file.originalname.split('.');
        cb(null,Data.now()+'.'+str[1]);
    }
});
var upload = multer({storage:storage});

router.post("/upload",upload.single("file"),function(req,res){
    var newlist={
        title:req.body.title,
        content:req.body.content
    };
    res.json({"ststus":0,"msg":'success',"data":newlist});
});


module.exports = router;
