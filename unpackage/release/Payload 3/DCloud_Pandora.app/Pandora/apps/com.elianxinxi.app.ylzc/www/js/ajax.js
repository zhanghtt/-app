var download_path= "_downloads/ylzz/";
//var host= 'http://192.168.1.108:8899'
//var host = "http://192.168.1.108:1717";
//var host = "http://hsnn12.3322.org:8053";
var host = 'http://www.elian.net'
//var host = 'http://192.168.1.2:9003'
//var host = "http://hzyl12.8800.org:9003"
//var host = 'http://www.elianxinxi.com:8101/'
//var host ='http://192.168.1.152:8899'
 //var host = "http://www.elianxinxi.com"
//var host  =   "http://hsnn12.3322.org:8052/"
//var host = "http://hsnn12.3322.org:8053"

var ajax_getCode = host + "/api/common/ValidateCode";
var ajax_registerURL = host + "/api/common/register";
var ajax_SearchURL = host + "/api/common/FullSearch";
var ajax_indexSlideURL = host + "/api/common/IndexSlide";//轮播图

var ajax_loginURL = host + "/api/common/Login";
var ajax_resetPwdURL = host + "/api/common/ResetPwd";
var ajax_menberInfoURL = host + "/api/common/Member";//个人信息
var ajax_modMemberURL = host + "/api/common/ModMember";//修改个人信息；
var ajax_modPwordURL = host + "/api/common/ModPword";

var ajax_addCollectionURl = host + "/api/common/AddCollection";
var ajax_collectionListURL = host + "/api/common/Collection";
var ajax_cancelCollectionURl = host + "/api/common/CancelCollection";


var ajax_uploadHeadImgURl = host + "/api/common/UpLoadHeadImages";//头像上传

var ajax_msgListURl = host + "/api/common/MsgList";//消息列表
var ajax_msgDetailURl = host + "/api/common/MsgDetail";//消息详情
var ajax_msgDelURL = host + "/api/common/MsgDel";//删除消息

var ajax_articleDetailURL = host + "/api/common/ArticleDetail";//文章详情url

var ajax_addtimePlanURl = host + "/api/common/AddTimePlan";//添加时间计划
var ajax_timePlaneURL = host + "/api/common/TimePlan";//时间列表
var ajax_cacelTimeWarnURL = host + "/api/common/CancelTimePlanWarm";//时间不在提醒

var ajax_updateTimeWarnURL = host + "/api/common/UpdateTimePlanWarm";//更新时间继续提醒

var ajax_cacelTimeURl = host + "/api/common/CancelTimePlan";//删除修改时间

var ajax_loginoutURL = host + "/api/common/logout";//退出登陆接口

var ajax_pushURL = host + "/api/common/AppSetting";//推送设置

var ajax_update_appVersion = '/api/common/CheckUpdate' 

//获取公司信息
var ajax_getAboutCompany = host + '/api/common/GetCompanyInfo'

function getNowFormatDate() {
		var date = new Date();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
		    month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
		    strDate = "0" + strDate;
		}
		var strHours = date.getHours()
		if (strHours >= 0 && strHours <= 9) {
			strHours = "0" + strHours;
		}
		var strMinutes = date.getMinutes();
		if (strMinutes >=0 && strMinutes <=9){
			strMinutes = "0" + strMinutes
		}
		var strSeconds = date.getSeconds();
		if (strSeconds >=0 && strSeconds <=9){
			strSeconds = "0" + strSeconds
		}
		var currentdate = date.getFullYear() +""+ month +""+ strDate +""+ strHours+""+ strMinutes+""+ strSeconds;
		date = null,month = null,strDate=null,strHours=null,strMinutes=null,strSeconds=null;
		return currentdate;
	};




function openpage(url){
	//新建windows页面，传递url值过去并在页面中打开
	     mui.openWindow({
					id: url,
					url: 'windows.html',
					styles: {
						top: 0,
						bottom: 0,
						bounce: 'none',
    					popGesture: 'close' // 'hide', 'close','none'
					},
					 extras:{
					 	pageurl:url
					 },
					 show:{
					      autoShow:true,//页面loaded事件发生后自动显示，默认为true
					      aniShow:'auto',//页面显示动画，默认为”slide-in-right“；
					      duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					    },
					 waiting:{
					 	autoShow:false,
					 },
					createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				});
};

function openpageIndex(url){
	//新建windows页面，传递url值过去并在页面中打开
	    mui.openWindow({
					id: url,
					url: 'pages/windows.html',
					styles: {
						top: 0,
						bottom: 0,
						bounce: 'none',
    					popGesture: 'close' // 'hide', 'close','none'
					},
					 extras:{
					 	pageurl:url,
					 },
					  show:{
					      autoShow:true,//页面loaded事件发生后自动显示，默认为true
					      aniShow:'auto',//页面显示动画，默认为”slide-in-right“；
					      duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					    },
					 waiting:{
					 	autoShow:false,
					 },
					createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				});
};

//判断用户是否登录，未登录直接转到登录页面
function judgeLogin(){
	var userdata=plus.storage.getItem('memberdata');
	if(userdata!=''&&userdata!=null){
		var $user =  JSON.parse(userdata);
		if(($user.token == null)||$user.token == ""){
			return false;
		}
		return $user;
	}
	return false;
};
//防止连续点击导致webView打开失败
var tap_first = null;
function unsafe_tap() {
	if (!tap_first) {
		tap_first = new Date().getTime();
		setTimeout(function() {
			tap_first = null;
		},1500)
	}else {
		return true;
	}
}


 String.prototype.endWith=function(str){  
	            if(str==null||str==""||this.length==0||str.length>this.length)  
	              return false;  
	            if(this.substring(this.length-str.length)==str)  
	              return true;  
	            else  
	              return false;  
	            return true;  
	        }  


