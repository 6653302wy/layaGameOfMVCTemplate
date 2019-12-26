import MoudleManager from "../pureMvc/MoudleManager";
import GlobalDefine from "../GlobalDefine";


/**
* name 
*/
export default class Helper {

	constructor() {
	}

	public static getSingle<T>(c: {new(): T; }): T {
		let inst: T;
        if (c.hasOwnProperty('_inst')) {
            inst = c['_inst'];
        }
        if (!inst) {
            inst = new c();
            Object.defineProperty(c, '_inst', {
                value: inst
            });
        }
        return inst;
	}

	public static isArray(array) {
		return !!(array && array.constructor == Array);
	}

	//为数组Arrary添加一个乱序方法
	public static addMixSortToArr() {
		if (!Array.prototype['shuffle']) {
			Array.prototype['shuffle'] = function () {
				for (var j, x, i = this.length; i; j = parseInt((Math.random() * i).toString()), x = this[--i], this[i] = this[j], this[j] = x);
			};
		}
	}

	//获取数组里不重复的元素 key: 根据元素里某个属性来判断是否重复
	public static getNoRepeatListFromArr(arr: any[], key: string = null): any[] {
		let temp: any[] = [];
		for (let i = 0; i < arr.length; i++) {
			if (!key) {
				if (temp.indexOf(arr[i]) == -1) temp.push(arr[i]);
			} else {
				if (temp.indexOf(arr[i][key]) == -1) temp.push(arr[i][key]);
			}
		}

		return temp;
	}

	public static deepCopy(obj: any): any {
		return JSON.parse(JSON.stringify(obj));
	}

	public static deepCopyArr(arr: any[]): any[] {
		// let arr1 = [];
		// for(let i = 0; i < arr.length; i++){
		// 	let arrObj = arr[i];
		// 	let obj = Helper.deepCopy(arrObj);
		// 	// for(let key in arrObj){
		// 	// 	if(arrObj[key] instanceof Object){
		// 	// 		obj[key].__proto__ = arrObj[key].__proto__;
		// 	// 	}
		// 	// }
		// 	obj.__proto__ = arrObj.__proto__;

		// 	arr1.push(obj);
		// }
		// return arr1;
		return arr.slice();
	}

	// 根据字符串获取数字数组
	public static StringParseToNumberArray(strSrc: string, splitChar: string): Array<number> {
		if (!strSrc) return null;
		let strarr: Array<string> = strSrc.split(splitChar);
		let intArr: Array<number> = [];
		for (let i = 0; i < strarr.length; i++) {
			intArr.push(+strarr[i]);
		}
		return intArr;
	}

	// 获取语言id对应字符串
	// public static getLanguage(id: number, params: any[] = null): string {
	// 	let str: string = GameStaticDataMgr.getInstance().LanObj[id];
	// 	if (str) {
	// 		let localStr = str[PlayerData.getInstance().LanType];
	// 		if (!localStr) localStr = str['en'];
	// 		if (params) {
	// 			for (let i = 0; i < params.length; i++) {
	// 				localStr = localStr.replace('{' + i + '}', params[i]);
	// 			}
	// 		}

	// 		return localStr;
	// 	}

	// 	return id.toString();
	// }

	public static TimeLineFunction(times: number[], funcs: any[], complete?: Function) {
		let time: number = 0;
		for (let i = 0; i < funcs.length; i++) {
			let intervalTime: number = i < times.length ? times[i] : 0;
			time += intervalTime;
			Laya.timer.once(time, this, () => {
				let func = funcs[i]["func"];
				let arg = funcs[i]["arg"];
				func(arg);
				if (i >= funcs.length - 1 && complete)
					complete();
			});
		}

	}

	//数组随机数
	public static GetRandom(array: any[]): any {
		let ran_f = Math.random() * array.length;
		let ran_i = Math.floor(ran_f);//获取0~array.length-1的随机整数
		return array[ran_i];
	}

	// 获取最小值到最大值之前的整数随机数
	public static GetRandomNumInt(min: number, max: number): number {
		let range = max - min;
		let rand = Math.random();
		return (min + Math.round(rand * range));
	}

	// 获取最小值到最大值之前的随机数
	public static GetRandomNum(min: number, max: number): number {
		let range = max - min;
		let rand = Math.random();
		return (min + rand * range);
	}

	/**
  * 对象做贝塞尔曲线运动
  * @param p0 起点
  * @param p1 控制点
  * @param p2 终点
  * @param obj 控制的对象
  * @param time 花费的时间，单位毫秒
  * @param delayTime 延迟时间
  * @param ease 缓动类型
  * @param complete 完成回调
  * */
	public static BezierTween(p0: Laya.Point, p1: Laya.Point, p2: Laya.Point, obj: any, time: number, delayTime?: number, ease?: Function, complete?: Laya.Handler): Laya.Tween {
		class BazierPoint {
			obj: Laya.Sprite;
			p0: Laya.Point;
			p1: Laya.Point;
			p2: Laya.Point;
			t: number = 0;

			constructor(_p0: Laya.Point, _p1: Laya.Point, _p2: Laya.Point, _obj: any) {
				this.obj = _obj;
				this.p0 = _p0;
				this.p1 = _p1;
				this.p2 = _p2;
			}

			public get factor(): number {
				return this.t;
			}

			public set factor(value: number) {
				this.t = value;
				this.obj.x = (1 - value) * (1 - value) * this.p0.x + 2 * value * (1 - value) * this.p1.x + value * value * this.p2.x;
				this.obj.y = (1 - value) * (1 - value) * this.p0.y + 2 * value * (1 - value) * this.p1.y + value * value * this.p2.y;
				// DebugLog.log(this.obj.name + "-----" + this.obj.x + "    " + this.obj.y);
			}
		}

		let bp = new BazierPoint(p0, p1, p2, obj);
		let tw = Laya.Tween.to(bp, { factor: 1 }, time, ease, complete, delayTime, false);
		return tw;
	}

	/**
	  *  获取对象所有的key
	  * */
	public static getObjKeys(obj: Object): string[] {
		let arr: string[] = [];
		for (var key in obj) {
			arr.push(key);
		}
		return arr;
	}

	/**
	  *  判断是否为图片
	  * */
	public static isImgRes(url: string): boolean {
		let imgs: string[] = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];
		let suffix: string = this.getFileType(url);

		return imgs.indexOf(suffix) != -1;
	}

	/**
	  *  判断是否为3d资源
	  * */
	public static isD3Res(url: string): boolean {
		let imgs: string[] = ['ls', 'lh'];
		let suffix: string = this.getFileType(url);

		return imgs.indexOf(suffix) != -1;
	}

	/**
	  *  判断是否为atlas图集资源
	  * */
	public static isAtlasRes(url: string): boolean {
		let imgs: string[] = ['atlas'];
		let suffix: string = this.getFileType(url);

		return imgs.indexOf(suffix) != -1;
	}

	/**
	  *  根据url获取文件类型后缀 返回格式为 'png' 等
	  * */
	public static getFileType(url): string {
		return Laya.Utils.getFileExtension(url);
	}

	public static isIOS(): boolean {
		let ua = window.navigator.userAgent;
		return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	}

	public static check_support_webp() {
		if (Helper.isIOS) {
			return false;
		}
		try {
			return window.document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
		}
		catch (err) {
			return false;
		}
	}

	public static setLocalCache(key: string, val: any): void {
		Laya.LocalStorage.setItem(key, val);
	}

	public static getLocalCache(key: string): any {
		return Laya.LocalStorage.getItem(key);
	}

	public static deleteLocalCache(key: string) {
		Laya.LocalStorage.removeItem(key);
	}

	//广播
	public static SendFacade(name: string, body?: any, type?: string): void {
		puremvc.Facade.getInstance().sendNotification(name, body, type);
	}

	//创建handler
	public static Handler(caller: any, fun: Function, args: any[] = null, once: boolean = true): Laya.Handler {
		return Laya.Handler.create(caller, fun, args, once);
	}

	/** 打开模块
     * @param	names	要打开的模块 可单填模块名 也可以是数组； 例如 ModName.GAMESTATE 或者 [ModName.GAMESTATE, ModName.BaseUI]
	 * @param	params	需要携带的数据，如果第一个参数names是数组，那么此参数也必须是数组
	 * @param	dynamicUrls	需要动态加载的资源，如果第一个参数names是数组，那么此参数也必须是数组
     *  */
	public static openMod(names: any, params: any = null, dynamicUrls: any = null): void {
		if (names instanceof Array) {
			let arr: object[] = [];
			for (let i = 0; i < names.length; i++) {
				let plguinObj: object = {};
				plguinObj['key'] = names[i];
				if (params && params[i]) plguinObj['info'] = params[i];
				if (dynamicUrls && dynamicUrls[i]) plguinObj['dynaimcList'] = dynamicUrls[i];
				arr.push(plguinObj);
			}
			MoudleManager.inst.StartModule(arr);
		} else {
			MoudleManager.inst.StartModule({ key: names, info: params ? params : null, dynaimcList: dynamicUrls ? dynamicUrls : null });
		}
	}

	/** 关闭模块
     * @param	names	要关闭的模块 可单填模块名 也可以是数组； 例如 ModelName.GAMESTATE 或者 [ModelName.GAMESTATE, ModelName.BaseUI]
     *  */
	public static closeMod(names: any): void {
		if (names instanceof Array) {
			names.forEach((name) => {
				MoudleManager.inst.killModule(name);
			});
		} else {
			MoudleManager.inst.killModule(names);
		}

	}

	// private static mSamllTipsList: Array<fairygui.GLabel> = new Array<fairygui.GLabel>();
	// private static tipIsShowing: boolean = false;
	// public static showTip(msg: string, lanId: number = 0, params: any[] = null): void {
	// 	if (this.tipIsShowing) {
	// 		return;
	// 	}

	// 	if (lanId > 0) msg = Helper.getLanguage(lanId, params);

	// 	let smalltip: fairygui.GLabel = fairygui.UIPackage.createObject('Level', 'SamllTips') as fairygui.GLabel;
	// 	if (!smalltip) {
	// 		DebugLog.log('showSamllTip====', msg);
	// 		return;
	// 	}
	// 	this.tipIsShowing = true;
	// 	smalltip.title = msg;
	// 	fairygui.GRoot.inst.addChild(smalltip);
	// 	smalltip.sortingOrder = 999;

	// 	let aniend = () => {
	// 		if (this.mSamllTipsList.length > 0) {
	// 			this.tipIsShowing = false;
	// 			fairygui.GRoot.inst.removeChild(this.mSamllTipsList[0]);
	// 			this.mSamllTipsList[0].dispose();
	// 			this.mSamllTipsList.shift();
	// 		}
	// 	}

	// 	let transition: fairygui.Transition = smalltip.getTransition('Appear');
	// 	transition.play(Laya.Handler.create(this, aniend));
	// 	smalltip.center();
	// 	for (let l of this.mSamllTipsList) {
	// 		let toy = l.y - 70;
	// 		Laya.Tween.to(l, { y: toy }, 100, Laya.Ease.linearInOut, Laya.Handler.create(this, () => {
	// 		}));
	// 	}
	// 	this.mSamllTipsList.push(smalltip);
	// }

	// public static showMsgOkBox(_msg: string, _okFn?: Laya.Handler, title?: string): void {
	// 	if (!fairygui.UIPackage.createObject('Level', 'UICurrent1_B')) return;

	// 	AudioManager.Instance.PlaySound('menu_show');

	// 	let msgBox: fairygui.GComponent = fairygui.UIPackage.createObject('Level', 'UICurrent1_B') as fairygui.GComponent;
	// 	fairygui.GRoot.inst.addChild(msgBox);
	// 	msgBox.center();
	// 	msgBox.sortingOrder = 1999;
	// 	msgBox.getController('State').selectedIndex = 0;

	// 	let ani = msgBox.getTransition('Eject');
	// 	ani.play();

	// 	let closeBtn = msgBox.getChild('Close');

	// 	// msgBox.getChild('No').visible = false;

	// 	// msgBox.getChild('Title').text = Helper.getLanguage(24);
	// 	// msgBox.getChild('Yes').text =  Helper.getLanguage(16);

	// 	msgBox.getChild('Text').icon = 'ui/alert_' + _msg;
	// 	if (title) msgBox.getChild('T_Purchasesuccess').icon = 'ui/alert_' + title;
	// 	else msgBox.getChild('T_Purchasesuccess').icon = 'ui/Hint';

	// 	let close = (onlyClose: boolean = true) => {
	// 		ani.playReverse();
	// 		Laya.timer.once(300, this, () => {
	// 			fairygui.GRoot.inst.removeChild(msgBox);
	// 			msgBox = null;
	// 		});

	// 		if (onlyClose) AudioManager.Instance.PlaySound('menu_hide');
	// 		else AudioManager.Instance.PlaySound('button_click');

	// 		msgBox.getChild('Yes').offClick(this, okHdr);
	// 		if (closeBtn) closeBtn.offClick(this, close);

	// 		if (_okFn) _okFn.run();
	// 	}
	// 	let okHdr = () => {
	// 		close(false);
	// 	}

	// 	msgBox.getChild('Yes').onClick(this, okHdr);
	// 	if (closeBtn) closeBtn.onClick(this, close);
	// }

	// public static EnterLevel(): void {
	// 	GamePlayStateManager.Inst().EnterGoalGameState(GamePlayState.GameLevel);
	// }

	public static setLanType(type: string): void {
		let lan: string;
		switch (type) {
			case 'TW':
			case 'HK':
			case 'MO':
				lan = 'tw';
				break;
			case 'CN':
			case 'zh':
				lan = 'cn';
				break;
			default:
				lan = type;
		}
		GlobalDefine.Language = lan;
	}

	public static getColorFilter(R: number, G: number, B: number): Laya.ColorFilter {
		return new Laya.ColorFilter([
			R / 255, 0, 0, 0, 0,
			0, G / 255, 0, 0, 0,
			0, 0, B / 255, 0, 0,
			0, 0, 0, 1, 0
		]);
	}

	// public static playAddCoinAni(num: number, isAdd: boolean = true): void {
	// 	AudioManager.Instance.PlaySound('coin');

	// 	let coinCom: fairygui.GComponent = fairygui.UIPackage.createObject('Level', 'AddOneCoin') as fairygui.GComponent;
	// 	if (coinCom) {
	// 		fairygui.GRoot.inst.addChild(coinCom);
	// 		coinCom.sortingOrder = 999;
	// 		coinCom.x = fairygui.GRoot.inst.width - 152;
	// 		coinCom.y = 141;
	// 		coinCom.getChild('coinText').text = isAdd ? '+' + num : '-' + num;
	// 		let ani: fairygui.Transition = coinCom.getTransition('AddOneCoin');
	// 		ani.play(Helper.Handler(this, () => {
	// 			fairygui.GRoot.inst.removeChild(coinCom);
	// 			coinCom = null;
	// 		}));
	// 	}

	// }

	// public static PlayBoxRewardAni(startPos: Laya.Point, items: string[] = [], cb: Laya.Handler = null, aniName: string = 'Reward'): void {
	// 	let targetPos: Laya.Point;
	// 	let tempPos: Laya.Point;
	// 	let delay: number;
	// 	let isCoin: boolean = false;

	// 	for (let i = 0; i < items.length; i++) {
	// 		let rewardAni: fairygui.GComponent = fairygui.UIPackage.createObject('Level', 'Ani_Reward') as fairygui.GComponent;
	// 		if (rewardAni) {
	// 			fairygui.GRoot.inst.addChild(rewardAni);
	// 			rewardAni.sortingOrder = 999;
	// 			rewardAni.x = startPos.x;
	// 			rewardAni.y = startPos.y;
	// 			let ani: fairygui.Transition = rewardAni.getTransition(aniName);
	// 			let itemIcon: fairygui.GLoader = rewardAni.getChild('Reward').asLoader;


	// 			delay = (i + 1) * 100;
	// 			let item = items[i];
	// 			if (item == 'coin') {
	// 				isCoin = true;
	// 				// tempPos = PlayerData.getInstance().gameLevelCoinPos;
	// 				targetPos = new Laya.Point(tempPos.x + 230, tempPos.y - 50);

	// 			} else {
	// 				isCoin = false;
	// 				// tempPos = PlayerData.getInstance().getItemsPos(Number(item));
	// 				let offsetX: number;
	// 				// switch (Number(item)) {
	// 				// 	case ITEM_TYPE.ACTION_TIP: offsetX = 20; break;
	// 				// 	case ITEM_TYPE.REFRESH: offsetX = 50; break;
	// 				// 	case ITEM_TYPE.BOMB: offsetX = 80; break;
	// 				// }
	// 				targetPos = new Laya.Point(tempPos.x + offsetX, tempPos.y + 50);
	// 				itemIcon.icon = 'item/' + item;

	// 			}

	// 			let pos: Laya.Point = rewardAni.localToGlobal(itemIcon.x, itemIcon.y);
	// 			ani.play(Helper.Handler(this, () => {
	// 				if (isCoin) {
	// 					let flyPos: Laya.Point = new Laya.Point(pos.x - 50, pos.y);
	// 					Helper.BezierTween(pos, flyPos, targetPos, rewardAni, 600, delay, Laya.Ease.linearNone,
	// 						Laya.Handler.create(this, () => {
	// 							if (cb) cb.run();
	// 							fairygui.GRoot.inst.removeChild(rewardAni);
	// 							rewardAni = null;
	// 						}));

	// 				} else {
	// 					Laya.Tween.to(rewardAni, { x: targetPos.x, y: targetPos.y, scaleX: 0, scaleY: 0 }, 300, Laya.Ease.linearNone, Helper.Handler(this, () => {
	// 						if (cb) cb.run();
	// 						fairygui.GRoot.inst.removeChild(rewardAni);
	// 						rewardAni = null;
	// 					}), 300);
	// 				}

	// 			}));
	// 		}
	// 	}

	// }



}
