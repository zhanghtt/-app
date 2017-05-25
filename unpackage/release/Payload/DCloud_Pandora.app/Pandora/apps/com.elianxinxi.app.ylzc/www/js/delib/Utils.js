var myutil={}
myutil.loginCheck = function(handler){
	var userdata=plus.storage.getItem('memberdata');
	var user = JSON.parse(userdata);
	if(user){
		//传参
		handler(argument.slice(1));
	}else{
		plus.nativeUI.toast("请登录");
		openpage('login_standard.html');
	}
}