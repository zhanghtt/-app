/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(url,loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.UserID = loginInfo.UserID || '';
		loginInfo.Password = loginInfo.Password || '';
		loginInfo.uuid = plus.device.uuid || '';
		if (loginInfo.UserID.length < 1) {
			return callback('账号不得为空');
		}
		if (loginInfo.Password.length < 1) {
			return callback('密码不得为空');
		}
		if (loginInfo.account.length != 11) {
			return callback('请输入正确的电话号码');
		}
		//url为用于注册的url
		var user={};
		$.post(url,loginInfo,function(response_){
			response=JSON.parse(response_);
			response_ = null;
			if(response.result == 1)
			{
				
			  return callback(response.result);
			  
			 }
			else
			{
			  //获取用户账号等信息
			  user.name=response.name;
			  user.headimg=response.headimg;
			  user.uid=response.uid;
			  //增加local存储
			  user.token="zssg12345699";
			  var memberdata=JSON.stringify(user);
			  //console.log(memberdata);
			  if(response.append){
				//console.log(response.append);
				jQuery('body').append(response.append);
			}
			  plus.storage.setItem('memberdata',memberdata);
			  memberdata = null;
			  return callback();
			}
			  
		});
		/*var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.account == user.account && loginInfo.password == user.password;
		});
		if (authed) {
			return owner.createState(loginInfo.account, callback);
		} else {
			return callback('用户名或密码错误');
		}*/
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		var settings_str  =  JSON.stringify(settings);
		localStorage.setItem('$settings', settings_str);
		settings_str = null;
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
}(mui, window.app = {}));