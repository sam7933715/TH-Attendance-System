d3.csv('../public/csv/stafflist.csv',function(error,stafflist){
    
    //學院的陣列
    // var colleges=[]
    // for(i=0;i<stafflist.length;i++){
    //     colleges.push(stafflist[i].Supervisor)
    // }
    // console.log(colleges)

    //  var colleges=['商學院','工學院','建設學院','金融學院','建築專業學院','國際科技與管理學院','資電學院','人文社會學院','理學院','經營管理學院','跨領域設計學院','跨科系學習'];
     //document就是這html文件。
     //getElementById是裡面的方法，參數給"college-list"抓到這id標籤列
     var collegeSelect=document.getElementById("college-list");
     //製造一個字串，以html的語法填入院的陣列
     var inner="";
     for(var i=0;i<stafflist.length;i++){
         //inner第一行就會像是 <option value=0>商學院</option>
         inner=inner+'<option value=i>'+stafflist[i].Supervisor+'</option>';
     }
     //innerHTML 賦值inner給這element屬性
     collegeSelect.innerHTML=inner;
     /*
     其實就是用程式碼的方式把XML文件修改成這樣
     <select id="college-list">
         <option value="0">商學院</option>
         <option value="1">工學院</option>
         <option value="2">建設學院</option>
         <option value="3">建築專業學院</option>		
         ....		
     </select>
     */
     //這裡放系所的陣列(有順序性，對應各學院的資料)
     var sectors=new Array();
     //sectors[0]=...  陣列很長，要完整的code我上面有github連結
     //動到"college-list"這select元素後呼叫此方法
     function changeCollege(index){
         //跟剛剛一樣，製造一個字串，以html的語法填入系所的陣列
         var Sinner="";
         for(var j=0;j<stafflist.length;j++){
             Sinner=Sinner+'<option value=i>'+stafflist[j].Name+'</option>';
         }
         //抓到"sector-list"這select元素，修改其值
         var sectorSelect=document.getElementById("sector-list");
         sectorSelect.innerHTML=Sinner;
     }
     //這裡呼叫一次"changeCollege"這方法，讓瀏覽器在讀完XML後可以直接讓系所的資料出來(商學院)
     changeCollege(document.getElementById("college-list").selectedIndex);

})