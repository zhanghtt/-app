//定义原来需要加载的模块后续在瘦身
//加载base
require.config({
			baseUrl: 'js',
			shim: {
		 		index_old:{
		 			deps:['mui','ajax','index_js','aesdata','base_img'],
		 			exports:'index_old'
		 		},
		 		updateVersion:{
		 			deps:['mui'],
		 			exports:'updateVersion'
		 		}
		   },
		    paths: {
		    	index_old:'index/index-old',
				index_js:'index',
				 mui:'mui.min',
				ajax:'ajax',
				base_img:'g/publicImg_base64/public_img',
				updateVersion:'index/appVersionUpdate'
		    	}
	});
//old需要 模块依赖
 require(['index_old','updateVersion']);