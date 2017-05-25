//检测更新
function checkUpdate(version){
    mui.post(host + ajax_update_appVersion,{
		transtime:getNowFormatDate(),
		version:version
	},function(data_){
		plus.nativeUI.closeWaiting();
		 data = JSON.parse(data_);
                    data_ = null;
	                    if (data.result == 1) {
	                    		var update = data.statusCode==1
	                        if(update){
	                        		///h5更新包的url
	                        		var data_d = data.data;
		                        	var url = data_d.UpdateUrl;
		                      	if(url != "" && url!=null&&url!="null"){
		                      		downWgt(url)
		                      		return ;
		                      	}
		                        	var plat_market_url = null;
		                        if(mui.os.ios){
		                        		plat_market_url = data_d.IOSUrl
		                        }else if(mui.os.android){
		                        		plat_market_url = data_d.AndroidUrl
		                        }
		                        	if(plat_market_url){
		                        		//直接下载h5升级包
		                        		//downWgt(url);
		                        		 //直接打开appstore或者android
		                        		plus.nativeUI.confirm( "发现新版本，需要更新吗?", function(e){
										if(e.index == 0){
											 	plus.runtime.openURL(plat_market_url)
										}
									}, "易联招采", ["是","否"] );
		                        	}
	                        }else{
	                        		mui.alert(data.message);
	                        }
	                    } else {
	                    		mui.alert(data.message);
	                    }
	},'json'
	);
}
//下载资源
function downWgt(wgtUrl){
    plus.nativeUI.showWaiting("下载wgt文件...");
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) { 
            console.log("下载wgt成功："+d.filename);
            installWgt(d.filename); // 安装wgt包
        } else {
            console.log("下载wgt失败！");
            plus.nativeUI.alert("下载wgt失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
}

// 更新应用资源
function installWgt(path){
    plus.nativeUI.showWaiting("安装wgt文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        plus.nativeUI.alert("应用资源更新完成！",function(){
        		cleanupdatezip(path);
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    });
}

function cleanupdatezip(path){
	plus.io.resolveLocalFileSystemURL(path, function( fs ) {
		// 可通过fs进行文件操作 
		fs.remove( function ( entryitem ) {
						console.log("清空app升级包缓存");
						plus.runtime.restart();
							}, function ( e ) {
								mui.alert( e.message );
						plus.runtime.restart();
							} );
	}, function ( e ) {
		alert( "Request file system failed: " + e.message );
	} );
}