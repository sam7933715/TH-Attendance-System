var express = require('express');
var router = express.Router();
var memberModel =require('../models/memberModel.js');

//註冊功能
router.post('/register',function(req,res){
    var newmember = new memberModel({
        name: req.body.name,
        account: req.body.account,
        passwrod: req.body.passwrod,
    });
    memberModel.count({account:req.body.account},function(err,data){
        if(data>0){
            res.json({"status":1,"msg":"帳號已被註冊 !"});
        }
        else{
            newmember.save(function(err,data){
                if(err){
                    res.json({"status":1,"msg":"error"});
                }
                else{
                    res.json({"status":0,"msg":"success","data":data});
                }
            });
        }
    });
});

module.exports = router;
