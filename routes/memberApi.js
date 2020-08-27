var express = require('express');
var router = express.Router();
// var memberModel =require('../models/memberModel.js');

//memberModel.js content transfer to here
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ex6-4',{useNewUrlParser:true});

var memberSchema = new mongoose.Schema({
    name:String,
    account:String,
    password:String
});
memberSchema.set('collection','member');
var model =mongoose.model('member',memberSchema);

//註冊功能
router.post('/register',function(req,res){
    var newmember = new model({
        name: req.body.name,
        account: req.body.account,
        password: req.body.password
    });
    // model.count({account:req.body.account},function(err,data){
    //     if(data>0){
    //         res.json({"status":1,"msg":"帳號已被註冊 !"});
    //     }
    //     else{
            newmember.save(function(err,data){
                if(err){
                    res.json({"status":1,"msg":"error"});
                    console.log("add error");
                }
                else{
                    res.json({"status":0,"msg":"success","data":data});
                    console.log("add success");
                }
            });

});

module.exports = router;
