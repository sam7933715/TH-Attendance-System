var express = require('express');
var router = express.Router();
var multer = require('multer');


//membermode transfer to here / Revert
var mongoose = require('mongoose')

// inactive connection first
// mongoose.connect('mongodb://localhost:27017/checkinsys',{useNewUrlParser:true});

// Data upload to mongo DB
var memberSchema = new mongoose.Schema({
    name:String,
    account:String,
    password:String,
    photos:[]
});
memberSchema.set('collection','member1')
var model1 =mongoose.model('member1',memberSchema);

//Utilize multer module for photo upload to public/photos
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/photos');
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log(uniqueSuffix);
        var fullfilename = file.fieldname + '-' + uniqueSuffix
        cb(null, file.fieldname + '-' + uniqueSuffix)
        
    }
});
var upload = multer({storage:storage});


//photo upload to mongo DB
// router.post("/upload",upload.single("file"),function(req,res,next){
router.post("/upload",upload.any("progressbarTW_img"),function(req,res,next){
    var newmember = new model1({
        name: req.body.name,
        account: req.body.account,
        password: req.body.password,
        // photos:req.file.path
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


module.exports = router;
