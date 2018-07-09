exports.install = function(Vue, options) {
	//获取设备UUID
	Vue.prototype.base_uuid = function() {
//						return '866146034068365,866146034068373';
		return plus.device.uuid;
	};

	//	Vue.prototype.pregnancyDate = '2019-03-25';
	Vue.prototype.pregnancyDate = localStorage.getItem("pregnancyDate");
	Vue.prototype.fhrId;
	Vue.prototype.receiveParam = function() {
		//获取java辅助类
		var Helper = plus.android.importClass("com.ater.yangle.Helper");
		this.fhrId = Helper.getFhrId();
	}

	// 引导至蓝牙页面
	Vue.prototype.base_naviblue = function() {
		if(plus.os.name == "iOS") {
			var newVCobj = plus.ios.newObject("FindBLViewControler");
			//var UINavigationController = plus.ios.newObject("UINavigationController");
			//var nav = plus.ios.invoke(UINavigationController,"initWithRootViewController:",newVCobj);

			var UIApplicationClass = plus.ios.importClass("UIApplication");
			var UIAppObj = UIApplicationClass.sharedApplication();
			var del = plus.ios.invoke(UIAppObj, "delegate");

			var appWindowObj = plus.ios.invoke(del, "window");
			var appRootController = plus.ios.invoke(appWindowObj, "rootViewController");
			plus.ios.invoke(appRootController, "presentViewController:animated:completion:", newVCobj, "YES", null);
			//plus.ios.invoke(appRootController,"makeKeyAndVisible");
			//plus.ios.invoke(appRootController,"presentViewController:animated:completion:",nav,"YES",null);
		} else if(plus.os.name == "Android") {
			//检测蓝牙是否打开,如果没有打开就打开蓝牙
			var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
			var mBtAdapter = BluetoothAdapter.getDefaultAdapter();
			if(mBtAdapter == null) {
				return alert("请先开启蓝牙");
			}
			if(!mBtAdapter.isEnabled()) {
				mBtAdapter.enable();
			}
			//获取当前Activity
			var main = plus.android.runtimeMainActivity();
			//获取java辅助类
			var Helper = plus.android.importClass("com.ater.yangle.Helper");
			//创建对象实例
			var mHelper = new Helper();
			//调用java中的跳转方法，并且传入当前activity实例
			mHelper.jump(main, 'f3e4b706-67ed-4fe0-b5d6-9aeb78cc35c5', '1');
//			mHelper.jump(main, localStorage.getItem('userId'), localStorage.getItem('userRole'));
		}
	};

	//跳转原生胎心详情页
	Vue.prototype.base_navidetail = function(fhrId) {
		if(plus.os.name == "iOS") {
			var UserDefaultsClass = plus.ios.importClass("NSUserDefaults");
			var standardUserDefaults = UserDefaultsClass.standardUserDefaults();
			plus.ios.invoke(standardUserDefaults, "setObject:forKey:", fhrId, "moveId");

			var newVCobj = plus.ios.newObject("ResultViewControler");
			var UIApplicationClass = plus.ios.importClass("UIApplication");
			var UIAppObj = UIApplicationClass.sharedApplication();
			var del = plus.ios.invoke(UIAppObj, "delegate");

			var appWindowObj = plus.ios.invoke(del, "window");
			var appRootController = plus.ios.invoke(appWindowObj, "rootViewController");
			plus.ios.invoke(appRootController, "presentViewController:animated:completion:", newVCobj, "YES", null);

		} else if(plus.os.name == "Android") { //跳转原生Android胎心详情页

			//获取当前Activity
			var main = plus.android.runtimeMainActivity();
			//获取java辅助类
			var Helper = plus.android.importClass("com.ater.yangle.Helper");
			//创建对象实例
			var mHelper = new Helper();
			//调用java中的跳转方法，并且传入当前activity实例
			mHelper.jumpFhrDetail(main, fhrId);
		}
	};

	//保存用户信息至原生类
	Vue.prototype.base_saveUserInfo = function(userInfo) {
		if(plus.os.name == "iOS") {
			// if (typeof value != 'undefined' && typeof key === "string")
			// {
			var UserDefaultsClass = plus.ios.importClass("NSUserDefaults");
			var standardUserDefaults = UserDefaultsClass.standardUserDefaults();
			plus.ios.invoke(standardUserDefaults, "setObject:forKey:", userInfo.userId, "userId");
			plus.ios.invoke(standardUserDefaults, "setObject:forKey:", userInfo.userRole, "userRole");
			plus.ios.invoke(standardUserDefaults, "setObject:forKey:", userInfo.phone, "phone");
			plus.ios.invoke(standardUserDefaults, "synchronize");
			// }
		} else if(plus.os.name == "Android") {
			//todo
		}
	}

	//从原生类获取保存在本地的未同步的胎心数据
	Vue.prototype.getFileInfo = function() {
		if(plus.os.name == "IOS") {
			//todo

		} else if(plus.os.name == "Android") {
			alert("开始同步数据");
			var FileUtil = plus.android.importClass("com.ater.yangle.utils.FileUtil");
			var fhrTxt = FileUtil.getFile(FileUtil.FHR_FILE_NAME);
		    var fileNames = JSON.parse(fhrTxt);
		    alert("fileNames" + fileNames);
		    alert("fileNames.length" + fileNames.length);
			for(var i = 0; i < fileNames.length; i++) {
				alert(fileNames[i]);
				var fhrFileContent = FileUtil.getFile(fileNames[i]);
				alert("json:" + fhrFileContent);
				var fhrFileJson = JSON.parse(fhrFileContent); //转换成json对象
				alert("moveId:" + fhrFileJson.moveId);
				if(fhrFileJson.moveId == null || fhrFileJson.moveId == undefined || fhrFileJson.moveId.length <= 0) {
					this.uploadFhrData('/yFetalMovement/yfetalmovement/saveFetalHeart', fhrFileJson, fileNames[i]);
				} else {
					this.uploadFhrData('/yFetalMovement/yfetalmovement/update', fhrFileJson, fileNames[i]);
				}
			}
		}
	}

	/**
	 * 保存胎心数据
	 */
	Vue.prototype.uploadFhrData = function(url, fhrFileJson, fhrFile) {
		alert("moveId:" + fhrFileJson.moveId);
		alert("meanHeartRate:" + fhrFileJson.meanHeartRate);
		alert("monitoringTime:" + fhrFileJson.monitoringTime);
		alert("startTime:" + fhrFileJson.startTime);
		alert("heartRecord:" + fhrFileJson.heartRecord);
		alert("fetalMove:" + fhrFileJson.fetalMove);
		alert("userId:" + fhrFileJson.userId);
		this.axios.post(url, {
			moveId: fhrFileJson.moveId, //胎心id
			meanHeartRate: fhrFileJson.meanHeartRate, //平均心率
			monitoringTime: fhrFileJson.monitoringTime, //监测时间
			startTime: fhrFileJson.startTime, //开始时间
			heartRecord: fhrFileJson.heartRecord, //胎心数据
			fetalMove: fhrFileJson.fetalMove, //胎动
			userId: fhrFileJson.userId, //用户id
		}).then((response) => {
			console.log(response.data);
			if(response.data.resultCode == 200) {
				alert("同步完毕...");
				this.getMyFhrData();
				var FileUtil = plus.android.importClass("com.ater.yangle.utils.FileUtil");
				FileUtil.deleteFile(fhrFile);
			}

		}).catch((error) => {
			console.log(error);
		});
	}

	var nativeWebview, imm, InputMethodManager;
	var initNativeObjects = function() {
		if(plus.os.name == "Android") {
			var main = plus.android.runtimeMainActivity();
			var Context = plus.android.importClass("android.content.Context");
			InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
			imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
		} else {
			nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
		}
	};
	var showSoftInput = function() {
		var nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
		if(plus.os.name == "Android") {
			//强制当前webview获得焦点
			plus.android.importClass(nativeWebview);
			nativeWebview.requestFocus();
			imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
		} else {
			nativeWebview.plusCallMethod({
				"setKeyboardDisplayRequiresUserAction": false
			});
		}
		setTimeout(function() {
			//此处可写具体逻辑设置获取焦点的input
			var inputElem = document.getElementsByTagName('input');
			for(var i = 0; i < inputElem.length; i++) {
				inputElem[i].focus();
			}
		}, 200);
	};
	//	document.addEventListener('plusready', function() {
	//		alert("plusready触发");
	//		initNativeObjects();
	//		showSoftInput();
	//	});
	Vue.prototype.checkanddirect = function(passFunc, passValue, failedFunc, failedValue, id) {
		var userId = localStorage.getItem('userId');
		if(userId != null && userId != '') {
			passFunc();

			if(passValue != null && passValue != '') {
				this.$router.push({
					path: passValue
				});
			}
		} else {
			failedFunc();

			if(failedValue != null && failedValue != '') {
				this.$router.push({
					path: failedValue,
					query: {
						id: id
					}
				});
			}
		}
	}

	Vue.prototype.jumpRouter = function(routerName) {
		if(routerName != null && routerName != '') {
			this.$router.push({
				path: routerName
			})
		}
	}

	Vue.prototype.jumpRouterIds = [1, 2, 3, 4, 5]

	Vue.prototype.jumpRouterById = function(routerName, id) {
		if(routerName != null && routerName != '') {
			this.$router.push({
				path: routerName,
				query: {
					id: id
				}
			});
			localStorage.setItem(routerName + '-id', id);
		}
	}

	Vue.prototype.jumpNormalRouter = function(routerName) {
		if(routerName != null && routerName != '') {
			this.$router.push({
				path: routerName,
			});
		}
	}

	Vue.prototype.goBack = function() {
		this.$router.go(-1);
	}

	Vue.prototype.backListener = function() {
		this.goBack();
	}

	Vue.prototype.physicalBack = function() {
		if(plus.os.name == "Android") {
			plus.key.addEventListener("backbutton", this.backListener());
		}
	}

	Vue.prototype.removeBack = function() {
		// 取消监听backbutton事件
		plus.key.removeEventListener('backbutton', this.backListener());
	}

	Vue.prototype.noOpen = function() {
		return alert('此功能尚未开通，请耐心等待～');
	}

};