var GUtils = function(mui) {
    var f = this;
    var e = "0", g = "", h = "1", d, a, b;
    f.setCurItem = function(c) {
        f.curCateIndex = c;
        f.c = f.catesList[c]["catid"];
        if (c == 0) {
            f.ChannelName = "";
        } else {
            f.ChannelName = f.catesList[c]["catname"];
        }
        c=null;
    }, f.getCurCateInfo = function() {
        return f.catesList[f.curCateIndex];
    }, f.setCurCateId = function(i) {
        f.c = i;
    }, f.getCurCateId = function() {
        return f.c;
    }, f.getMenuCatesInfo = function() {
        f.code = statusCode.SUCCESS;
        f.catesList = [ {
            catid: 1,
            catname: "全部"
        }, {
            catid: 2,
            catname: "项目分析"
        }, {
            catid: 3,
            catname: "政策分析"
        }, {
            catid: 4,
            catname: "电子期刊"
        }, {
            catid: 5,
            catname: "行业分析"
        } , {
            catid: 6,
            catname: "汇总类表格"
        } ];
        f.info = f.catesList;
        return f.getResult();
    }, f.getNewsListInfo = function(c, j, i,loadListCallback,curDiv,page) {
    	var user = null,token='';
    		user = judgeLogin();
    		 if(user){
    		 	 token = user.token;
    		 }else{
    		 	token='';
    		 }
    	var  data_form  = {
                    transtime: j,
                    keyword: "",
                    ChannelName: f.ChannelName,
                    AreaID: "",
                    Pageindex: i,
                    Type: 1,
                    token:token
               };
        try {
            mui.ajax({
                type: "POST",
                url: c,
                async: true,
                data: data_form,
                dataType: "json",
                success: function(l_) {
                		console.log("url:",c)
                		console.log("data:",l_)
                		console.log("data_form:",JSON.stringify(data_form))
                		
                    l = JSON.parse(l_);
                    l_ = null;
                    data_form =null;
                    if (l.result == 1 && l.SearchResult.length != 0) {
                        f.code = statusCode.SUCCESS;
                        f.info = l.SearchResult;
                    } else {
                        f.code = statusCode.NODATA;
                        plus.nativeUI.toast("没有更多数据了")
                    }
                    loadListCallback(f,curDiv,page)
                },
                error: function() {
                		plus.nativeUI.toast("网络超时")
                    f.code = statusCode.ERROR;
                }
            });
        } catch (k) {
            f.code = statusCode.ERROR;
        }
        //return f.getResult();
    }, f.getResult = function() {
        var c = {};
        if (f.code == "undefined" || f.code == "0") {
            c.reCode = f.statusCode.ERROR;
        } else {
            c.reCode = f.code;
            c.reInfo = f.info;
        }
        return c;
    };
};