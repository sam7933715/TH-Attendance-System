function ShowTime() {
    var NowDate = new Date();
    var h = NowDate.getHours();
    var m = NowDate.getMinutes();
    var s = NowDate.getSeconds();
    if (h < 10) {
        h = "0" + h;
    };
    if (m < 10) {
        m = "0" + m;
    };
    if (s < 10) {
        s = "0" + s;
    };
    
    document.getElementById('showbox').innerHTML = h + ':' + m + ':' + s;
    setTimeout('ShowTime()', 1000);
}
