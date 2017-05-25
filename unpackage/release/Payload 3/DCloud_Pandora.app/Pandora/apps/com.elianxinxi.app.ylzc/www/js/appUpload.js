/*
 * 这部分使用来上传头像的js代码块
 */

var appupload = {
	init: function(obj) {
		var btnArray = [{
			title: "相册"
		}, {
			title: "拍照"
		}];
		plus.nativeUI.actionSheet({
			title: "选择照片",
			cancel: "取消",
			buttons: btnArray
		}, function(e) {
			var index = e.index;
			switch (index) {
				case 0:
					break;
				case 1:
					//相册
					plus.gallery.pick(function(path){
						appupload.upload(path,obj);
					},function(e) {
//						console.log("取消选择照片");
					},{filter:"image"});
					break;
				case 2:
					//拍照
					plus.camera.getCamera().captureImage(function(p) {
						plus.io.resolveLocalFileSystemURL(p,function(entry) {
							var path = entry.toLocalURL();
							appupload.upload(path,obj);
						},function(error) {
//							console.log("照片添加失败" + error.message);
						})
					});
					break;
			}
		});
	},
	upload: function(path,obj) {
		//现在用随机名称，后面最好是改成用户名+jpg对应来
		var dst = "_doc/photo/" + Math.random(100) + '.jpg';
		//裁剪图片
		plus.zip.compressImage({
			src: path,
			dst: dst,
			quality: 70,
			width: '340',
			height: '340',
			format: 'jpg'
		},function() {
			//通过URL参数获取目录对象或文件对象
			plus.io.resolveLocalFileSystemURL(dst,function(entry) {
				var data = {};
				data.dst = entry.toLocalURL();
				data.path = path;
				obj(data);
			});
		},function() {
			console.log('裁剪图片失败');
		});
		return path;
	}
}
