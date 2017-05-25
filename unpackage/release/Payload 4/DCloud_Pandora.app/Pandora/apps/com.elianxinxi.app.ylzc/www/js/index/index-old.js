var mui = require('mui')
//require('base_img')
//document.getElementById("qidongye").src = qidongye;
//console.log(qidongye.length)
//
function initEvents(){
    mui("#plist").on('tap', 'a', function() {
                     //点击事件
                     var page=this.getAttribute("id");
                     var pagetitle=this.getAttribute("page-title");
     
                     //触发time页的点击事件
                     if (page == "pages/timeindex.html") {
                     mui.fire(preate[page],'gohome');
                     }
                     
                     if(page != "pages/news.html" && now!=page)
                     {
                     if(page=="pages/user.html")
                     {
                     document.getElementById('message').classList.add("hidden");
                     document.getElementById('ppinputdiv').classList.add("hidden");
                     
                     //先user界面传值
                     preate[page].evalJS('getuser(1)');
                     preate[page].show();
                     }else if (page=="pages/analysis.html")
                     {
                     plus.webview.hide(preate["pages/user.html"]);
                     document.getElementById('ppinputdiv').classList.remove("hidden");
                     document.getElementById('message').classList.remove("hidden");
                     //给深度分析界面传值
                     preate[page].evalJS('turnFirst(1)');
                     plus.storage.setItem('searchType','1');
                     
                     preate[page].show();//显示界面
                     
                     //hide放在show之后会更快速
                     for(var index_ in preate){
                     if(index_==page){
                     continue;
                     }
                     plus.webview.hide(preate[index_]);
                     }
                     }
                     else
                     {
                     plus.webview.hide(preate["pages/user.html"]);
                     document.getElementById('ppinputdiv').classList.remove("hidden");
                     document.getElementById('message').classList.remove("hidden");
                     preate[page].show();//显示界面
                     }
                     }
                     else
                     {
                     //判断当前页面是否显示
                     if(now==page)
                     {
                     news.evalJS("turn2First(1)");//给news界面传值，触发方法。
                     
                     }
                     else
                     {
                     plus.webview.hide(preate["pages/user.html"]);
                     document.getElementById('ppinputdiv').classList.remove("hidden");
                     document.getElementById('message').classList.remove("hidden");
                     news.show();
                     }
                     plus.storage.setItem('searchType','0');
                     }
                     
                     now=page;
                     });
    
    //修改头像触发此处修改头像显示
    window.addEventListener('changeHeadImgIndex',function(event){
                            user = judgeLogin();
                            if (user && user.headimg){
                            document.getElementById("headImg_index").src = host + user.headimg
                            }else {
                            document.getElementById("headImg_index").src = "images/nav_img_head@2x.png"
                            }
                            user = null;
                            });
    
    mui.back = function() {
        
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
            first = new Date().getTime();
            mui.toast('再按一次退出应用');
            setTimeout(function() {
                       first = null;
                       }, 1000);
        } else {
            if (new Date().getTime() - first < 1000) {
                plus.runtime.quit();
            }
        }
    };
    
     //监听消息的点击事件
              plus.push.addEventListener("click", function(msg){
              	//alert("click:"+JSON.stringify(msg))
                                         shouldreceive = false;
                                         plus.push.clear();
                                         
                                         tsmsg=msg;
                                         tspage=1;
                                      //    tsclick(tsmsg);
                                         if(initStatus&&(start < 1)){
                                         tsclick(tsmsg);
                                         
                                         }
                                         
                                         }, false);

              // 监听在线消息事件
              plus.push.addEventListener("receive", function(msg){

                                         if(plus.storage.getItem("order")!=undefined&&plus.storage.getItem("order")!=""){
                                         order = Number(plus.storage.getItem("order"))
                                         }
                                         order++;
                                         //plus.runtime.setBadgeNumber(order);
                                         plus.storage.setItem("order",""+order);
                                         messageBadge();
                                         
                                        if(shouldreceive){
                                         
                                         tsmsg=msg;
                                         tspage=1;
                                        // alert(initStatus+" "+start);
                                        //  tsclick(tsmsg);
                                         if(initStatus&&(start < 1)){
                                            tsclick(tsmsg);

                                         }
                                         
                                        }
                                         shouldreceive = true;
                                          },false);
}

mui.init({
         statusBarBackground: '#0070bc',
         });
var ting="0";
var as='none';// 默认窗口打开无动画
var ws,news,now="pages/news.html";
var preate=null;
var start=1;
var tspage=0,tsmsg=null;
var user=null;
var analys=null;
var first = null;
var initStatus=false;
var badgeSpan = document.getElementById("badge");
var order=0;
var firstpage = document.getElementById("fristpage");
var shouldreceive = true;

mui.plusReady(function() {
              preateWebviews();//预加载页面
              news = preate['pages/news.html'];
               
              var fristopen=plus.storage.getItem("fristopen");
              //fristopen!="1"
              if(fristopen!="1")
              {
              plus.storage.setItem('order',"0");
              var first =  mui.openWindow({url:'pages/guide.html', id:'first',
                                          waiting:{
                                          autoShow:true,//自动显示等待框，默认为true
                                          }
                                         });
              plus.storage.setItem("fristopen","1");
                        
              first.addEventListener("close", function(){
                                     firstpage.classList.add("hidden");
                                     document.getElementById("qidongye").src = "";
                                     firstpage.parentNode.removeChild(firstpage);
                                     plus.navigator.setFullscreen(false);
                                      news.show("zoom-fade-out",300)
                                    });  
               start=0;
               initStatus=true;
              }else{
             // console.log("1:",start);
              count();
              }
              fristopen=null;
              initEvents();
              messageBadge();
              user = judgeLogin();
              if (user && user.headimg){
              document.getElementById("headImg_index").src = host + user.headimg
              }else {
              document.getElementById("headImg_index").src = "images/nav_img_head@2x.png"
              }
              
              if(plus.networkinfo.getCurrentType()=="1")
              {
              plus.nativeUI.toast("未联网， 请检查");
              }
              user = null;
              }); //plus.ready
document.getElementById("message").addEventListener('tap',function () {//更多
                                                    
                                                    user = judgeLogin();
                                                    if (user){
                                                    //plus.runtime.setBadgeNumber(0);
                                                    plus.storage.setItem('order','0');
                                                    messageBadge();
                                                    openpageIndex("user_message.html");
                                                    }else {
                                                    plus.nativeUI.toast("请登录");
                                                    openpageIndex('login_standard.html');
                                                    }
                                                    user = null;
                                                    });
document.getElementById("avator").addEventListener('tap',function() {
                                                   
                                                   user = judgeLogin();
                                                   if (user){
                                                   openpageIndex("user_info.html");
                                                   }else {
                                                   plus.nativeUI.toast("请登录");
                                                   openpageIndex('login_standard.html');
                                                   }
                                                   user = null;
                                                   });



document.getElementById("ppinputdiv").addEventListener('tap',function() {
                                                       user = judgeLogin();
                                                       if (user){
                                                       mui.openWindow({
                                                                      id: 'pages/search.html',
                                                                      url: 'pages/search.html',
                                                                      styles: {
                                                                      top: 0,
                                                                      bottom: 0,
                                                                      bounce: 'none',
                                                                      popGesture: 'close' // 'hide', 'close','none'
                                                                      },
                                                                      extras:{
                                                                      },
                                                                      waiting:{
                                                                      autoShow:false,
                                                                      },
                                                                      createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
                                                                      });
                                                       }else {
                                                       plus.nativeUI.toast("请登录");
                                                       openpageIndex('login_standard.html');
                                                       }
                                                       user = null;
                                                       });


function messageBadge() {
				var order_tmp1 = Number(plus.storage.getItem("order"));
    var badgeOrder = isNaN(order_tmp1)?0:order_tmp1
    if (badgeOrder == 0){
        badgeSpan.className = 'mui-badge pphidden';
    }else {
        badgeSpan.className = 'mui-badge';
        badgeSpan.innerHTML = badgeOrder;
    }
   // plus.runtime.setBadgeNumber(badgeOrder);
    badgeOrder = null;
}

function count()
{	//alert("count():"+start)
console.log("2:",start);
console.log("initStatus",initStatus)
    if(start>0)
    {
    //	news=plus.webview.create("pages/news.html","news",{top:"44px",bottom:'53px',scrollIndicator:'none',scalable:false,scrollsToTop:'true',popGesture:'right'});
        start = start-1;
        initStatus = true;
        setTimeout(function(){
                   count();
                   },300);
    }
    else
    {
        firstpage.classList.add("hidden");
        document.getElementById("qidongye").src = "";
        firstpage.parentNode.removeChild(firstpage);
        plus.navigator.setFullscreen(false);
        news.show("zoom-fade-out",300)
    }
    
}
/**
 * 对推送消息进行处理，打开页面
 * @param {Object} msg
 */
function tsclick(msg) {
   // alert(JSON.stringify(msg));
   // mui.alert(JSON.stringify(msg))
    var resp,content=null;
   
    if (mui.os.android) {
        //安卓消息处理
        content=msg.payload;//获取传递数据
    }
    if (mui.os.ios){
        //iOS消息处理
        content=msg.payload;//获取传递数据
        
    }
    var type=typeof content;
    if(type=="object")
        resp = content;
    else{
        resp= JSON.parse(content);
    }
    //alert("进入了tclick  处理:contIos:"+JSON.stringify(resp))
    type = null;
   // mui.alert(JSON.stringify(resp))
    clickMessage(resp);}
//因为recivie跟click push 是异步接收的，需要使用回调代理
//做个messagebadge更新代理
window.addEventListener('updateBadge',function(event){
                        var order_tmp1 = plus.storage.getItem("order");
                        var order_tmp2 = order_tmp1==''?0:Number(order_tmp1)
                        order--;
                        // alert("storage order_tmp:"+order_tmp)
                        if(order_tmp2>0){
                        //消息角标
                        order_tmp2--;
                        }
                        //alert("设置点击后的 order_tmp:"+order_tmp)
                        plus.storage.setItem('order',""+order_tmp2);
                        messageBadge();
                        });

function clickMessage(cont) {
       //alert("进入了clickMessage:"+JSON.stringify(cont))
    var modelid=Number(cont.modelid);
    //    var style = plus.webview.currentWebview.getStyle();
    //    alert(style.zindex)
    //    var zindex = ++(style.zindex);
    switch(modelid) {
        case 1:
            //打开新闻页面
            user = judgeLogin();
            var channelID=cont.channelID;
            var articleID=cont.articleID;
            var transtime = getNowFormatDate();
            var tspage=plus.webview.create("pages/base_page.html","base_page.html",{
                                           top: 0,
                                           bottom: 0,
                                           bounce: 'none',
                                           zindex:1,
                                           popGesture: 'close' // 'hide', 'close','none'
                                           },{
                                           updateBage:true,
                                           pageurl:ajax_articleDetailURL,
                                           usertoken:user.token,
                                           transtime:transtime,
                                           pagechannelid:channelID,
                                           pagearticleid:articleID,
                                           atitle:'消息详情',
                                           });
            tspage.show("auto",300);
            tspage=1;
            channelID = null;
            articleID = null;
            transtime = null;
            break;
        case 2:
            //打开连接
            var tsurl=cont.url;
            openpageIndex(tsurl);
            tspage=1;
            break;
        case 3:
            //多条推送，放入到今日安排中打开列表
            if(cont.msgType=='mutiList'){
                //等待页面初始化完成再执行
                var timeindex = 'timeindex.html';
                mui.openWindow({
                               id: 'timeindex_push',
                               url: 'pages/windows.html',
                               styles: {
                               top: 0,
                               bottom: 0,
                               bounce: 'none',
                               zindex:1,
                               popGesture: 'close' // 'hide', 'close','none'
                               },
                               extras:{
                               updateBage:true,
                               pageurl:timeindex,
                               trigger:"gohome"
                               },
                               waiting:{
                               autoShow:false,
                               },
                               show:{
							      autoShow:true,//页面loaded事件发生后自动显示，默认为true
							      aniShow:'auto',//页面显示动画，默认为”slide-in-right“；
							      duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
							    },
                               createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
                               });
                break;
            }
            var msgID=cont.msgID;
            var transtime = getNowFormatDate();
            var tspage=plus.webview.create("pages/user_message_detail.html","user_message_detail.html",{
                                           top: 0,
                                           bottom: 0,
                                           bounce: 'none',
                                           popGesture: 'close' // 'hide', 'close','none'
                                           },{
                                           updateBage:true,
                                           pageurl:ajax_msgDetailURl,
                                           usertoken:user.token,
                                           transtime:transtime,
                                           MsgID:msgID,
                                           });
            tspage.show('auto',300);
            tspage=1;
            break;
            
        default:
            plus.nativeUI.alert( msg.content );
    }
}