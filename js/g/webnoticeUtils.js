var GUtils = function(mui) {
    var me = this;
    var code = "0", info = "", c = "1", catesList, curCateIndex, ChannelName;
    me.setCurItem = function(i) {
        me.curCateIndex = i;
        me.c = me.catesList[i]["catid"];
        if (i == 0) {
        		me.ChannelName = "";
        }else {
        		me.ChannelName = me.catesList[i]["catname"];
        }
    }, me.getCurCateInfo = function() {
        return me.catesList[me.curCateIndex];
    }, me.setCurCateId = function(c) {
        me.c = c;
    }, me.getCurCateId = function() {
        return me.c;
    }, me.getMenuCatesInfo = function() {
        me.code = statusCode.SUCCESS;
        me.catesList = [{
            catid: 1,
            catname: "全部"
        }, {
            catid: 2,
            catname: "招标项目"
        }, {
            catid: 3,
            catname: "招标资讯"
        }, {
            catid: 4,
            catname: "基药政策"
        }, {
            catid: 5,
            catname: "新农合政策"
        }, {
            catid: 6,
            catname: "医保政策"
        }, {
            catid: 7,
            catname: "低价药政策"
        }, {
            catid: 8,
            catname: "OTC政策"
        }, {
            catid: 9,
            catname: "其他政策"
        }];
        me.info = me.catesList;
        return me.getResult();
    }, me.getImgNewsByCid = function(url, params,callback,curDiv,t) {
        try {
           mui.ajax({
                type: "POST",
                data: {
                    transtime: params
                },
                async: false,
                url: url,
                dataType: "json",
                success: function(data_) {
                    data = JSON.parse(data_);
                    if (data.result == 1) {
                        me.code = statusCode.SUCCESS;
                        me.info = data.Slide;
                    } else {
                        me.code = statusCode.NODATA;
                    }
                    callback(me,curDiv,t)
                },
                error: function() {
                    me.code = statusCode.ERROR;
                }
            });
        } catch (e) {
            me.code = statusCode.ERROR;
        }
        //return me.getResult();
    }, me.getNewsListInfo = function(url, atime, Pageindex,loadListCallback,curDiv,page) {
    	var user = null,token='';
    		user = judgeLogin();
    		 if(user){
    		 	 token = user.token;
    		 }else{
    		 	token='';
    		 }
   	var data_form = {
                    transtime: atime,
                    keyword: "",
                    ChannelName: me.ChannelName,
                    AreaID: "",
                    Pageindex: Pageindex,
                    Type: 3,
                    token:token
             };
           mui.ajax({
                type: "POST",
                url: url,
                async: true,
                data: data_form,
                dataType: "json",
                success: function(data_) {
//              	console.log(url)
//              	console.log(JSON.stringify(data_form))
              	console.log(data_)
                    data = JSON.parse(data_);
                    if (data.result == 1 && data.SearchResult.length != 0) {
                        me.code = statusCode.SUCCESS;
                        me.info = data.SearchResult;
                    } else {
                        me.code = statusCode.NODATA;
                        plus.nativeUI.toast("没有更多数据了")
                    }
                    loadListCallback(me,curDiv,page)
                },
                error: function() {
                	   plus.nativeUI.toast("网络超时")
                	   plus.nativeUI.closeWaiting();
                    me.code = statusCode.ERROR;
                }
            });
       
        //return me.getResult();
    }, me.getResult = function() {
        var o = {};
        if (me.code == "undefined" || me.code == "0") {
            o.reCode = me.statusCode.ERROR;
        } else {
            o.reCode = me.code;
            o.reInfo = me.info;
        }
        return o;
    };
};