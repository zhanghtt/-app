function downWgtSilent(wgtUrl){
	plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
	        if ( status == 200 ) { 
	            console.log("下载wgt成功："+d.filename);
	            installWgtSilent(d.filename); // 安装wgt包
	        } else {
	            console.log("下载wgt失败！");
	            //plus.nativeUI.alert("下载wgt失败！");
	        }
	    }).start();
	
}
function installWgtSilent(path){
    plus.runtime.install(path,{},function(){
        plus.runtime.restart();
    },function(e){
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
    });
}
function downWgt(wgtUrl){
	if(wgtUrl !== '' && wgtUrl !==null && typeof(wgtUrl) !== undefined){
		plus.nativeUI.showWaiting("下载更新文件...");
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
	}else{
	    plus.nativeUI.alert("下载更新失败！");
    }
}

function installWgt(path){
    plus.nativeUI.showWaiting("安装更新文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        plus.nativeUI.alert("更新完成！",function(){
            plus.runtime.restart();
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("安装更新失败，请联系客服。错误码：["+e.code+"]："+e.message);
    });
}
