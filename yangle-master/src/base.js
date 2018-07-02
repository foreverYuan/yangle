exports.install = function(Vue, options) {
	//获取设备UUID
	Vue.prototype.base_uuid = function() {
//		return '866146034068365,866146034068373';
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
			mHelper.jump(main, localStorage.getItem('userId'), localStorage.getItem('userRole'));
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

		} else if(plus.os.name == "Android") {
		    alert("Android数据");
			var FileUtil = plus.android.importClass("com.ater.yangle.utils.FileUtil");
//			alert(FileUtil.fhrTxtName);
			var fhrTxt = FileUtil.getFile("1530518609731.txt");
			alert(fhrTxt);
		}
	}

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