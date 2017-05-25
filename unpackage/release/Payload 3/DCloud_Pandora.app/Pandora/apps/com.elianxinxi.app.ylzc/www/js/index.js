//plus.storage.setItem("fristopen","1");
    /*var types = {}; 
	types[plus.networkinfo.CONNECTION_UNKNOW] = "未知网络连接"; 
	types[plus.networkinfo.CONNECTION_NONE] = "未连接网络"; 
	types[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络"; 
	types[plus.networkinfo.CONNECTION_WIFI] = "wifi连接"; 
	types[plus.networkinfo.CONNECTION_CELL2G] = "2G网络"; 
	types[plus.networkinfo.CONNECTION_CELL3G] = "3G网络"; 
	types[plus.networkinfo.CONNECTION_CELL4G] = "4G网络"; 
	console.log( "Network: " + types[plus.networkinfo.getCurrentType()] );*/

// 预创建二级页面
function preateWebviews(){
	preate = new Object();
	var plist=document.getElementById('plist').children;
	// 由于启动是预创建过多Webview窗口会消耗较长的时间，所以这里限制仅创建5个
	for(var i=0;i<plist.length&&i<4;i++){
		var id=plist[i].id;
		preateWebivew(id);
	}
//	ws.append(preate[3])
//	ws.append(preate[2])
//	ws.append(preate[1])
//	ws.append(preate[0])
//	console.log("preate:",preate.length)
//	console.log("indexjs,length:",ws.children().length)
}
function preateWebivew(id){
	var w = null;
	if(!preate[id]){
		if(id!="pages/user.html"){
			 w=plus.webview.create(id,id,{top:'44px',bottom:'53px',scrollIndicator:'none',scalable:false,scrollsToTop:'true',popGesture:'none'});
		}else{
			 w=plus.webview.create(id,id,{top:'0',bottom:'53px',scrollIndicator:'none',scalable:false,scrollsToTop:'true',popGesture:'none'});
		}
		//w.hide()
		preate[id]=w;
		//ws.append(w)
//		w.addEventListener('close',function(){//页面关闭后可再次打开
//			preate[id]&&(preate[id]=null);//兼容窗口的关闭
//		},false);
	}
}

//function openpage(url){
//	//新建windows页面，传递url值过去并在页面中打开
//	    mui.openWindow({
//					id: url,
//					url: 'pages/windows.html',
//					styles: {
//						top: 0,
//						bottom: 0,
//						bounce: 'none',
//  					popGesture: 'close' // 'hide', 'close','none'
//					},
//					 extras:{
//					 	pageurl:url,
//					 },
//					 waiting:{
//					 	autoShow:false,
//					 },
//					createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
//				});
//}

