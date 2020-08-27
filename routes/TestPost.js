app.post('/upload', function(req, res){
    //接收前臺POST過來的base64
    var imgData = req.body.imgData;
    //過濾data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile("image.png", dataBuffer, function(err) {
    if(err){
    res.send(err);
    }else{
    res.send("儲存成功！");
    }
    });
   });