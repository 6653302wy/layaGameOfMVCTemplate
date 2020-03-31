/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/FSM/GamePlayStateManager.ts":
/*!*****************************************!*\
  !*** ./src/FSM/GamePlayStateManager.ts ***!
  \*****************************************/
/*! exports provided: GamePlayState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamePlayState", function() { return GamePlayState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GamePlayStateManager; });
/* harmony import */ var _util_DebugLog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/DebugLog */ "./src/util/DebugLog.ts");
/* harmony import */ var _util_Dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Dictionary */ "./src/util/Dictionary.ts");
/* harmony import */ var _state_HomeState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state/HomeState */ "./src/FSM/state/HomeState.ts");
/* harmony import */ var _state_LevelState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state/LevelState */ "./src/FSM/state/LevelState.ts");
/* harmony import */ var _state_LoadingState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/LoadingState */ "./src/FSM/state/LoadingState.ts");





var GamePlayState;
(function (GamePlayState) {
    GamePlayState[GamePlayState["UnKnow"] = 0] = "UnKnow";
    GamePlayState[GamePlayState["Loading"] = 1] = "Loading";
    GamePlayState[GamePlayState["Home"] = 2] = "Home";
    GamePlayState[GamePlayState["Level"] = 3] = "Level"; //关卡
})(GamePlayState || (GamePlayState = {}));
class GamePlayStateManager {
    constructor() {
        this.mFSMList = new _util_Dictionary__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.mFSMList.set(GamePlayState.Loading, new _state_LoadingState__WEBPACK_IMPORTED_MODULE_4__["default"]());
        this.mFSMList.set(GamePlayState.Home, new _state_HomeState__WEBPACK_IMPORTED_MODULE_2__["default"]());
        this.mFSMList.set(GamePlayState.Level, new _state_LevelState__WEBPACK_IMPORTED_MODULE_3__["default"]());
    }
    static get inst() {
        if (!GamePlayStateManager._instance) {
            GamePlayStateManager._instance = new GamePlayStateManager();
        }
        return GamePlayStateManager._instance;
    }
    EnterGoalGameState(state) {
        if (GamePlayStateManager.mCurrPlayState !== GamePlayState.UnKnow &&
            state === GamePlayStateManager.mCurrPlayState) {
            return;
        }
        this.ChangeState(state);
    }
    ChangeState(newState) {
        GamePlayStateManager.mNewState = newState;
        this.state = this.mFSMList.get(newState);
        if (this.state) {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_0__["default"].log("切换场景========", this.state);
            if (GamePlayStateManager.mCurrPlayState != GamePlayState.UnKnow)
                this.mFSMList.get(GamePlayStateManager.mCurrPlayState).ExitState(); //退出状态
            GamePlayStateManager.mPriorPlayState =
                GamePlayStateManager.mCurrPlayState;
            GamePlayStateManager.mCurrPlayState = GamePlayStateManager.mNewState;
            this.state.EnterState({
                comCb: Laya.Handler.create(this, this.onComCallBack),
                errCb: Laya.Handler.create(this, this.onErrorCallBack)
            }); // 进入状态
        }
    }
    onComCallBack() {
        _util_DebugLog__WEBPACK_IMPORTED_MODULE_0__["default"].log("进入新状态=====");
    }
    onErrorCallBack() {
        if (GamePlayStateManager.mPriorPlayState !== GamePlayState.UnKnow) {
            this.ChangeState(GamePlayStateManager.mPriorPlayState);
        }
    }
    //可在主模块加载完成调用
    //按需调用，如不使用则要在主模块加载结束后添加
    OnChangeComplete(succeed) {
        if (succeed) {
            if (GamePlayStateManager.mCurrPlayState != GamePlayState.UnKnow)
                this.mFSMList.get(GamePlayStateManager.mCurrPlayState).onComplete();
        }
        else {
            if (GamePlayStateManager.mCurrPlayState != GamePlayState.UnKnow)
                this.mFSMList.get(GamePlayStateManager.mCurrPlayState).onError();
        }
    }
}
GamePlayStateManager.mCurrPlayState = GamePlayState.UnKnow; //当前状态
GamePlayStateManager.mPriorPlayState = GamePlayState.UnKnow; //前一个状态
GamePlayStateManager.mNewState = GamePlayState.UnKnow; //目标状态


/***/ }),

/***/ "./src/FSM/GameStateBase.ts":
/*!**********************************!*\
  !*** ./src/FSM/GameStateBase.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameStateBase; });
class GameStateBase {
    constructor() {
    }
    EnterState(info) {
        this.cb = info.comCb;
        this.error = info.errCb;
    }
    ExitState() {
    }
    onComplete() {
        if (this.cb)
            this.cb.run();
    }
    onError() {
        if (this.error)
            this.error.run();
    }
}


/***/ }),

/***/ "./src/FSM/state/HomeState.ts":
/*!************************************!*\
  !*** ./src/FSM/state/HomeState.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HomeState; });
/* harmony import */ var _GameStateBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameStateBase */ "./src/FSM/GameStateBase.ts");
/* harmony import */ var _util_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Helper */ "./src/util/Helper.ts");
/* harmony import */ var _ModuleName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ModuleName */ "./src/ModuleName.ts");



//游戏启动模块
class HomeState extends _GameStateBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
    EnterState(info) {
        super.EnterState(info);
        _util_Helper__WEBPACK_IMPORTED_MODULE_1__["default"].openMod(_ModuleName__WEBPACK_IMPORTED_MODULE_2__["default"].HOME_PANEL);
    }
    ExitState() {
        _util_Helper__WEBPACK_IMPORTED_MODULE_1__["default"].closeMod(_ModuleName__WEBPACK_IMPORTED_MODULE_2__["default"].HOME_PANEL);
    }
    onComplete() {
    }
}


/***/ }),

/***/ "./src/FSM/state/LevelState.ts":
/*!*************************************!*\
  !*** ./src/FSM/state/LevelState.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LevelState; });
/* harmony import */ var _GameStateBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameStateBase */ "./src/FSM/GameStateBase.ts");
/* harmony import */ var _util_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Helper */ "./src/util/Helper.ts");
/* harmony import */ var _ModuleName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ModuleName */ "./src/ModuleName.ts");



//游戏启动模块
class LevelState extends _GameStateBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
    EnterState(info) {
        super.EnterState(info);
        _util_Helper__WEBPACK_IMPORTED_MODULE_1__["default"].openMod(_ModuleName__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_LEVEL);
    }
    ExitState() {
        _util_Helper__WEBPACK_IMPORTED_MODULE_1__["default"].closeMod(_ModuleName__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_LEVEL);
    }
    onComplete() {
    }
}


/***/ }),

/***/ "./src/FSM/state/LoadingState.ts":
/*!***************************************!*\
  !*** ./src/FSM/state/LoadingState.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoadingState; });
/* harmony import */ var _GameStateBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameStateBase */ "./src/FSM/GameStateBase.ts");
/* harmony import */ var _util_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Helper */ "./src/util/Helper.ts");
/* harmony import */ var _ModuleName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ModuleName */ "./src/ModuleName.ts");



//游戏启动模块
class LoadingState extends _GameStateBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
    EnterState(info) {
        super.EnterState(info);
        _util_Helper__WEBPACK_IMPORTED_MODULE_1__["default"].openMod(_ModuleName__WEBPACK_IMPORTED_MODULE_2__["default"].LAOGING);
    }
    ExitState() {
        _util_Helper__WEBPACK_IMPORTED_MODULE_1__["default"].closeMod(_ModuleName__WEBPACK_IMPORTED_MODULE_2__["default"].LAOGING);
    }
    onComplete() {
    }
}


/***/ }),

/***/ "./src/GameConfig.ts":
/*!***************************!*\
  !*** ./src/GameConfig.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameConfig; });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
/*
* 游戏初始化配置;
*/
class GameConfig {
    constructor() {
    }
    static init() {
        // var reg: Function = Laya.ClassUtils.regClass;
    }
}
GameConfig.width = 640;
GameConfig.height = 1136;
GameConfig.scaleMode = "fixedwidth";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;
GameConfig.init();


/***/ }),

/***/ "./src/GlobalDefine.ts":
/*!*****************************!*\
  !*** ./src/GlobalDefine.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GlobalDefine; });
class GlobalDefine {
    constructor() {
    }
    static getFUIImg(img) {
        return GlobalDefine.ImageUrl + img + ".png";
    }
}
/** 是否显示调试面板 */
GlobalDefine.Debug_panel = true;
/** 是否显示log */
GlobalDefine.Debug_log = true;
/** 平台 */
GlobalDefine.Platform = 0;
/** 请求服务器地址 */
GlobalDefine.CurrServerUrl = '';
/** 版本号 */
GlobalDefine.Version = '1.0.0';
/** 动态加载资源路径 */
GlobalDefine.ImageUrl = 'res/GIMG/';


/***/ }),

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fairygui_UIGloaderExtension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fairygui/UIGloaderExtension */ "./src/fairygui/UIGloaderExtension.ts");
/* harmony import */ var _FSM_GamePlayStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FSM/GamePlayStateManager */ "./src/FSM/GamePlayStateManager.ts");
/* harmony import */ var _GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameConfig */ "./src/GameConfig.ts");
/* harmony import */ var _manager_LoaderManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./manager/LoaderManager */ "./src/manager/LoaderManager.ts");
/* harmony import */ var _manager_MultipleResCfgLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./manager/MultipleResCfgLoader */ "./src/manager/MultipleResCfgLoader.ts");
/* harmony import */ var _PlatFormMgr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PlatFormMgr */ "./src/PlatFormMgr.ts");
/* harmony import */ var _pureMvc_core_GM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pureMvc/core/GM */ "./src/pureMvc/core/GM.ts");
/* harmony import */ var _util_DebugLog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/DebugLog */ "./src/util/DebugLog.ts");
/* harmony import */ var _util_Helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/Helper */ "./src/util/Helper.ts");









class Main {
    constructor() {
        //根据IDE设置初始化引擎
        if (window["Laya3D"])
            Laya3D.init(_GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].width, _GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].height);
        else
            Laya.init(_GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].width, _GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = _GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].scaleMode;
        Laya.stage.screenMode = _GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].screenMode;
        Laya.stage.alignV = _GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].alignV;
        Laya.stage.alignH = _GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].alignH;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = _GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (_GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (_GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (_GameConfig__WEBPACK_IMPORTED_MODULE_2__["default"].stat)
            Laya.Stat.show();
        Laya.alertGlobalError(false);
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        //启动框架
        _pureMvc_core_GM__WEBPACK_IMPORTED_MODULE_6__["default"].getInstance().setup(Laya.stage, puremvc.Facade.getInstance());
        _pureMvc_core_GM__WEBPACK_IMPORTED_MODULE_6__["default"].getInstance().setupMgr.setupModules();
        _PlatFormMgr__WEBPACK_IMPORTED_MODULE_5__["default"].inst.init();
        this.initFont();
    }
    onVersionLoaded() {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    }
    onConfigLoaded() {
        _manager_LoaderManager__WEBPACK_IMPORTED_MODULE_3__["default"].ins.loadRes(_manager_MultipleResCfgLoader__WEBPACK_IMPORTED_MODULE_4__["default"].RES_GROUP, _util_Helper__WEBPACK_IMPORTED_MODULE_8__["default"].Handler(this, this.LoadAllGameConfig));
    }
    LoadAllGameConfig() {
        this.initFGUICfg();
        _util_DebugLog__WEBPACK_IMPORTED_MODULE_7__["default"].log("开始游戏====");
        _FSM_GamePlayStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].inst.EnterGoalGameState(_FSM_GamePlayStateManager__WEBPACK_IMPORTED_MODULE_1__["GamePlayState"].Loading);
    }
    initFGUICfg() {
        fgui.UIConfig.packageFileExtension = "obj";
        fgui.UIConfig.defaultFont = "huakang";
        fgui.UIObjectFactory.setLoaderExtension(_fairygui_UIGloaderExtension__WEBPACK_IMPORTED_MODULE_0__["default"]);
        Laya.stage.addChild(fgui.GRoot.inst.displayObject);
        Laya.SoundManager.useAudioMusic = !Laya.Browser.onIOS;
        Laya.SoundManager.autoStopMusic = true;
    }
    initFont() {
        const txt = new Laya.Text();
        txt.text = "曌";
        txt.font = "huakang";
    }
}
//激活启动类
new Main();


/***/ }),

/***/ "./src/ModuleName.ts":
/*!***************************!*\
  !*** ./src/ModuleName.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ModuleName; });
class ModuleName {
}
ModuleName.LAOGING = 'loading';
ModuleName.LAOGING_MEDIATOR = 'LAOGING_MEDIATOR';
ModuleName.HOME_PANEL = 'HOME_PANEL';
ModuleName.HOME_PANEL_MEDIATOR = 'HOME_PANEL_MEDIATOR';
ModuleName.GAME_LEVEL = 'GAME_LEVEL';
ModuleName.GAME_LEVEL_MEDIATOR = 'GAME_LEVEL_MEDIATOR';
ModuleName.NET = 'NET';
ModuleName.NET_MEDIATOR = 'NET_Mediator';
ModuleName.NET_PROXY = 'NET_PROXY';


/***/ }),

/***/ "./src/PlatFormMgr.ts":
/*!****************************!*\
  !*** ./src/PlatFormMgr.ts ***!
  \****************************/
/*! exports provided: default, PLATFORM_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlatFormMgr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLATFORM_TYPE", function() { return PLATFORM_TYPE; });
/* harmony import */ var _util_Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/Helper */ "./src/util/Helper.ts");

class PlatFormMgr {
    constructor() {
        this.mPlatAdReady = false; //平台广告是否加载好
    }
    static get inst() {
        return _util_Helper__WEBPACK_IMPORTED_MODULE_0__["default"].getSingle(PlatFormMgr);
        // return this._instance == null ? this._instance = new PlatFormMgr() : this._instance;
    }
    init() {
        this.mPlatAdReady = true;
    }
    requestPayment(offerId, buyNum, env, cb = null) {
    }
}
var PLATFORM_TYPE;
(function (PLATFORM_TYPE) {
    PLATFORM_TYPE[PLATFORM_TYPE["AD"] = 0] = "AD";
    PLATFORM_TYPE[PLATFORM_TYPE["BUY"] = 1] = "BUY";
})(PLATFORM_TYPE || (PLATFORM_TYPE = {}));


/***/ }),

/***/ "./src/ResGroup.ts":
/*!*************************!*\
  !*** ./src/ResGroup.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResGroup; });
class ResGroup {
}
ResGroup.Loading = 'levelData';


/***/ }),

/***/ "./src/app/moudles/loading/LoadingPlugin.ts":
/*!**************************************************!*\
  !*** ./src/app/moudles/loading/LoadingPlugin.ts ***!
  \**************************************************/
/*! exports provided: LoadingMoudle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingMoudle", function() { return LoadingMoudle; });
/* harmony import */ var _pureMvc_core_Moudle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../pureMvc/core/Moudle */ "./src/pureMvc/core/Moudle.ts");
/* harmony import */ var _ResGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../ResGroup */ "./src/ResGroup.ts");
/* harmony import */ var _view_LoadingMediator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/LoadingMediator */ "./src/app/moudles/loading/view/LoadingMediator.ts");



/**
 *  loading
 */
class LoadingMoudle extends _pureMvc_core_Moudle__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super([_ResGroup__WEBPACK_IMPORTED_MODULE_1__["default"].Loading]);
    }
    override_registerPureMvcAndStart() {
        this.super_registerMediator(new _view_LoadingMediator__WEBPACK_IMPORTED_MODULE_2__["default"]());
    }
}


/***/ }),

/***/ "./src/app/moudles/loading/view/LoadingMediator.ts":
/*!*********************************************************!*\
  !*** ./src/app/moudles/loading/view/LoadingMediator.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoadingMediator; });
/* harmony import */ var _ModuleName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../ModuleName */ "./src/ModuleName.ts");
/* harmony import */ var _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../util/DebugLog */ "./src/util/DebugLog.ts");


/**
 *  loading 加载UI
 */
class LoadingMediator extends puremvc.Mediator {
    constructor() {
        super(_ModuleName__WEBPACK_IMPORTED_MODULE_0__["default"].LAOGING_MEDIATOR);
    }
    listNotificationInterests() {
        return []; //GameEventType.UPDATE_LOADING_PROGRESS
    }
    handleNotification(notification) {
        let body = notification.getBody();
        switch (notification.getName()
        // case GameEventType.UPDATE_LOADING_PROGRESS:
        //     //更新进度条
        //     this.view.setProValue(notification.getBody());
        //     break;
        ) {
        }
    }
    onRegister() {
        _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log("====打开loading界面==");
        // if (this.view == null) {
        //     this.view = new LoadingView(this);
        // }
        // this.view.show();
    }
    onRemove() {
        if (this.view)
            this.view.dispose();
        this.view = null;
        // puremvc.Facade.getInstance().sendNotification(GameEventType.LOADING_COMPLETE);
    }
}


/***/ }),

/***/ "./src/fairygui/UIGloaderExtension.ts":
/*!********************************************!*\
  !*** ./src/fairygui/UIGloaderExtension.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UIGloaderExtension; });
/* harmony import */ var _manager_LoaderManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../manager/LoaderManager */ "./src/manager/LoaderManager.ts");
/* harmony import */ var _GlobalDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GlobalDefine */ "./src/GlobalDefine.ts");


class UIGloaderExtension extends fgui.GLoader {
    constructor() {
        super();
        this.imgurl = '';
    }
    loadExternal() {
        if (this.imgurl == this.url) {
            this.displayObject.visible = true;
            // ResManager.ins.setResUseCount(this.imgurl);
        }
        else {
            if (this.url) {
                if (this.url.split('/')[0] != 'atlas') {
                    if (this.url.indexOf('gif') != -1 || this.url.indexOf('webp') != -1) {
                        this.imgurl = _GlobalDefine__WEBPACK_IMPORTED_MODULE_1__["default"].ImageUrl + this.url;
                    }
                    else {
                        this.imgurl = _GlobalDefine__WEBPACK_IMPORTED_MODULE_1__["default"].getFUIImg(this.url);
                    }
                }
                else if (this.url.slice(0, 4) == 'http') {
                    this.imgurl = this.url;
                }
                else {
                    this.imgurl = 'res/' + this.url + ".png";
                }
                //加载图片
                _manager_LoaderManager__WEBPACK_IMPORTED_MODULE_0__["default"].ins.loadRes(this.imgurl, Laya.Handler.create(this, this.onLoadSuccess));
            }
            else {
                this.displayObject.visible = false;
                //释放图片
                Laya.loader.clearTextureRes(this.imgurl);
                // ResManager.ins.setResUseCount(this.imgurl, false);
            }
        }
    }
    freeExternal(texture) {
        this.displayObject.visible = false;
        Laya.loader.clearTextureRes(this.imgurl);
        // ResManager.ins.setResUseCount(this.imgurl, false);
    }
    onLoadSuccess() {
        var img = _manager_LoaderManager__WEBPACK_IMPORTED_MODULE_0__["default"].ins.getRes(this.imgurl);
        this.displayObject.visible = true;
        if (img) {
            // ResManager.ins.setResUseCount(this.imgurl);
            this.onExternalLoadSuccess(img);
        }
        else {
            this.url = null;
        }
    }
}


/***/ }),

/***/ "./src/manager/LoaderManager.ts":
/*!**************************************!*\
  !*** ./src/manager/LoaderManager.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoaderManager; });
/* harmony import */ var _util_Dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Dictionary */ "./src/util/Dictionary.ts");
/* harmony import */ var _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/DebugLog */ "./src/util/DebugLog.ts");
/* harmony import */ var _MultipleResCfgLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MultipleResCfgLoader */ "./src/manager/MultipleResCfgLoader.ts");
/* harmony import */ var _util_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Helper */ "./src/util/Helper.ts");




class LoaderManager {
    constructor() {
        this.errHdrList = new _util_Dictionary__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.loaderList = new _util_Dictionary__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.isLoaing = false;
        this.d2ResLoadCom = false;
        this.d3ResLoadCom = false;
        this.totalCheckTime = 20000; //加载检测总时长
        this.checkRate = 5000; //间隔多久检测一次
        Laya.loader.on(Laya.Event.ERROR, this, this.onLoaingError);
    }
    static get ins() {
        return this._instance == null ? this._instance = new LoaderManager() : this._instance;
    }
    /** 加载资源
     * @param	url	要加载的单个资源地址或资源信息数组。比如：简单数组：["a.png","b.png"] 复杂数组[{url: 'xx.png', type: Loader.IMAGE},...]
     * @param	comHdr	加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
     * @param	groupName	组名 不填默认为资源url url为数组时，取第一个资源的url
     * @param	waitTime		加载等待时间 如果加载超过设定的等待时间，则返回null,使用时自行判断并做容错处理（资源的加载并未停止）
     * @param	errHdr		加载出错的回调
     * @param	isStatic		是否静态常驻的资源 常驻的资源不会自动清理， 不常驻的资源会根据需要自动清理
     * @param	alwayscb		默认为true, 资源加载无论成功失败，都返回complete回调； 否则为false,失败不返回complete回调
     *  */
    loadRes(url, comHdr = null, groupName = null, waitTime = 0, errHdr = null, isStatic = false, alwayscb = true) {
        let groupKey;
        if (url instanceof Array) {
            let tempUrl = this.getRealUrl(url[0]) + '_group';
            groupKey = groupName == null ? this.getRealUrl(tempUrl) : groupName;
        }
        else {
            groupKey = groupName == null ? this.getRealUrl(url) : groupName;
        }
        if (this.checkAllLoaded(url)) {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log(groupKey + ' 已下载，直接返回回调。。');
            if (comHdr)
                comHdr.run();
            return;
        }
        if (this.loaderList.get(groupKey)) { //有重复加载请求，判断回调是否也相同
            let cb = this.loaderList.get(groupKey)['cb'];
            if (cb && comHdr && (comHdr != cb)) {
                groupKey += '_1';
            }
            else {
                _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log('有重复提交的加载请求，请检查代码=======');
                this.loadNext();
                return;
            }
        }
        this.loaderList.set(groupKey, { url: url, cb: comHdr, wait: waitTime, static: isStatic, needscb: alwayscb });
        if (errHdr)
            this.errHdrList.set(groupKey, { url: url, cb: errHdr }); //错误处理
        this.loadNext();
    }
    /** 加载组资源
     * @param	groupName	要加载的组资源名
     * @param	comHdr	加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
     * @param	waitTime		加载等待时间 如果加载超过设定的等待时间，则返回null,使用时自行判断并做容错处理（资源的加载并未停止）
     * @param	errHdr		加载出错的回调
     * @param	isStatic		是否静态常驻的资源 常驻的资源不会自动清理， 不常驻的资源会根据需要自动清理
     * @param	alwayscb		默认为true, 资源加载无论成功失败，都返回complete回调； 否则为false,失败不返回complete回调
     *  */
    loadResGroup(groupName, comHdr = null, waitTime = 0, errHdr = null, isStatic = false, alwayscb = true) {
        let resList = _MultipleResCfgLoader__WEBPACK_IMPORTED_MODULE_2__["default"].getinstance().getResArray(groupName);
        if (resList && resList.length)
            this.loadRes(resList, comHdr, groupName, waitTime, errHdr, isStatic, alwayscb);
    }
    /** 获取资源对象 */
    getRes(url) {
        // ResManager.ins.setResUseCount(url);
        return Laya.loader.getRes(url);
    }
    /** 清理资源 */
    clearRes(url, groupName = null) {
        // ResManager.ins.clearRes(url, groupName);
        Laya.loader.clearRes(url);
    }
    /** 清理未加载的内容 */
    cancleLoader(url) {
        if (url instanceof Array)
            Laya.loader.cancelLoadByUrls(url);
        else
            Laya.loader.cancelLoadByUrl(url);
    }
    loadNext() {
        if (this.isLoaing)
            return;
        if (this.loaderList.keys.length == 0)
            return;
        this.curLoadGroup = this.loaderList.keys[0];
        let loaderUrl = this.loaderList.get(this.curLoadGroup)['url'];
        this.curWaitTime = this.loaderList.get(this.curLoadGroup)['wait'];
        let d2ResList = [];
        let d3ResList = [];
        let addLoaderList = (url) => {
            let tempUrl = this.getRealUrl(url);
            if (_util_Helper__WEBPACK_IMPORTED_MODULE_3__["default"].isD3Res(tempUrl)) {
                d3ResList.push(tempUrl);
            }
            else {
                if (typeof url == 'string')
                    d2ResList.push({ url: url, type: null });
                else
                    d2ResList.push(url);
            }
        };
        if (loaderUrl instanceof Array) {
            loaderUrl.forEach((url) => {
                addLoaderList(url);
            });
        }
        else {
            addLoaderList(loaderUrl);
        }
        this.d2ResLoadCom = !Boolean(d2ResList.length);
        this.d3ResLoadCom = !Boolean(d3ResList.length);
        if (!this.d2ResLoadCom || !this.d3ResLoadCom)
            this.startLoad(d2ResList, d3ResList);
    }
    startLoad(d2List, d3List) {
        this.isLoaing = true;
        this.startTime = new Date().getTime();
        if (this.curWaitTime > 0)
            Laya.timer.loop(10, this, this.waitingTimerHdr);
        Laya.timer.loop(this.checkRate, this, this.checkLoadingStateHdr);
        if (d2List.length)
            Laya.loader.load(d2List, _util_Helper__WEBPACK_IMPORTED_MODULE_3__["default"].Handler(this, this.onD2LoadingComHdr), Laya.Handler.create(this, this.onLoadingProgressHdr, null, false), null, 1, true, this.curLoadGroup);
        if (d3List.length)
            Laya.loader.create(d3List, _util_Helper__WEBPACK_IMPORTED_MODULE_3__["default"].Handler(this, this.onD3LoadingComHdr), Laya.Handler.create(this, this.onLoadingProgressHdr, null, false));
    }
    onD2LoadingComHdr(result) {
        if (result == null || result == false) {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log(this.curLoadGroup + ' 2d资源加载未完成。。');
            if (!this.loaderList.get(this.curLoadGroup)['needscb']) {
                this.stopCheck();
                return;
            }
        }
        this.d2ResLoadCom = true;
        if (this.d2ResLoadCom && this.d3ResLoadCom) {
            this.loadingComHdr(result);
        }
    }
    onD3LoadingComHdr(result) {
        if (result == null || result == false) {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log(this.curLoadGroup + ' 3d资源加载未完成。。');
            if (!this.loaderList.get(this.curLoadGroup)['needscb']) {
                this.stopCheck();
                return;
            }
        }
        this.d3ResLoadCom = true;
        if (this.d2ResLoadCom && this.d3ResLoadCom) {
            this.loadingComHdr(result);
        }
    }
    loadingComHdr(res) {
        this.isLoaing = false;
        this.stopWaiting();
        this.stopCheck();
        let key = this.curLoadGroup;
        let loadingUseTime = new Date().getTime() - this.startTime; //加载所用的时长
        if (res) {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log(this.curLoadGroup + ' 加载完成，所用时长：' + loadingUseTime + ' ms');
        }
        else {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log(this.curLoadGroup + ' 加载未完成，所用时长：' + loadingUseTime + ' ms');
        }
        let cb = this.loaderList.get(this.curLoadGroup)['cb'];
        let cb_1;
        if (this.loaderList.get(this.curLoadGroup + '_1')) { //相同资源的加载，不同的回调
            cb_1 = this.loaderList.get(this.curLoadGroup + '_1')['cb'];
            this.loaderList.remove(this.curLoadGroup + '_1');
        }
        let waitTime = this.loaderList.get(this.curLoadGroup)['wait'];
        // ResManager.ins.setLoadedRes(this.curLoadGroup, this.loaderList.get(this.curLoadGroup)['url'], this.loaderList.get(this.curLoadGroup)['static']);
        this.loaderList.remove(this.curLoadGroup);
        this.curLoadGroup = null;
        this.loadNext();
        if (cb_1)
            cb_1.runWith(res);
        if (cb) {
            if (waitTime > 0 && loadingUseTime > (waitTime + 10)) { //容差10毫秒
                _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log(key + ' 加载超过设定等待时间' + waitTime + ' ms ,不执行回调==');
                return;
            }
            cb.runWith(res);
        }
    }
    waitingTimerHdr() {
        let loadingUseTime = new Date().getTime() - this.startTime; //加载所用的时长
        // DebugLog.log('[' + this.curLoadGroup + ']' + ' 检测下载时长== ', loadingUseTime);
        if (loadingUseTime > this.curWaitTime) {
            this.stopWaiting();
            if (!this.checkAllLoaded(this.loaderList.get(this.curLoadGroup)['url'])) { //未加载完
                let cb = this.loaderList.get(this.curLoadGroup)['cb'];
                _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log(this.curLoadGroup + ' 加载超过设定等待时间==,返回null');
                if (cb)
                    cb.runWith(null);
            }
        }
    }
    stopWaiting() {
        this.curWaitTime = 0;
        Laya.timer.clear(this, this.waitingTimerHdr);
    }
    checkLoadingStateHdr() {
        this.totalCheckTime -= this.checkRate;
        _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log(this.curLoadGroup + ' ===loading检测：', this.totalCheckTime);
        if (this.totalCheckTime <= 0) {
            this.stopCheck();
            let urls = this.loaderList.get(this.curLoadGroup)['url'];
            if (this.checkAllLoaded(urls)) {
                _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log('检测到资源已全部下载完成--------', this.curLoadGroup);
                if (urls instanceof Array) {
                    this.loadingComHdr(true);
                }
                else {
                    this.loadingComHdr(this.getRes(this.getRealUrl(urls)));
                }
            }
            else {
                _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log('加载超时未完成。。。。');
                // this.alertToRefresh();
            }
        }
    }
    alertToRefresh() {
        let alertStr = '加载超时未完成,检查资源路径或网络';
        window.alert(alertStr);
        location.reload();
    }
    stopCheck() {
        Laya.timer.clear(this, this.checkLoadingStateHdr);
        this.totalCheckTime = 20000;
    }
    onLoadingProgressHdr(pro) {
        // DebugLog.log(this.curLoadGroup + ' Loading...' + Math.round(pro * 100));
    }
    /**
    *  根据url获取文件类型后缀 返回格式为 'png' 等
   * */
    getFileType(url) {
        return Laya.Utils.getFileExtension(url);
    }
    checkAllLoaded(urls) {
        let bo = true;
        let check = (url) => {
            let res = this.getRealUrl(url);
            if (!Laya.loader.getRes(res)) {
                return false;
            }
            return true;
        };
        if (urls instanceof Array) {
            for (let i = 0; i < urls.length; i++) {
                bo = check(urls[i]);
                if (!bo)
                    break;
            }
            // urls.forEach((resUrl) => {
            //     bo = check(resUrl);
            //     if(!bo)return false;
            // });
        }
        else {
            bo = check(urls);
        }
        return bo;
    }
    getRealUrl(url) {
        return typeof (url) == 'string' ? url : url['url'];
    }
    onLoaingError(errUrl) {
        // console.error('资源LD错误===' + errUrl);
        this.isLoaing = false;
        Laya.loader.clearRes(errUrl);
        let cb;
        this.errHdrList.keys.forEach((key) => {
            if (cb)
                return false;
            let loaderList = this.errHdrList.get(key);
            let tempUrl;
            if (loaderList.url instanceof Array) {
                loaderList.url.forEach((data) => {
                    tempUrl = this.getRealUrl(data);
                    if (tempUrl == errUrl) {
                        cb = loaderList.cb;
                        // this.errHdrList.remove(key);
                        return false;
                    }
                });
            }
            else {
                tempUrl = this.getRealUrl(loaderList.url);
                if (tempUrl == errUrl) {
                    cb = loaderList.cb;
                    this.errHdrList.remove(key);
                    return false;
                }
            }
        });
        if (cb)
            cb.runWith(errUrl);
    }
}
LoaderManager._instance = null;


/***/ }),

/***/ "./src/manager/MultipleResCfgLoader.ts":
/*!*********************************************!*\
  !*** ./src/manager/MultipleResCfgLoader.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MultipleResCfgLoader; });
/* harmony import */ var _util_DebugLog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/DebugLog */ "./src/util/DebugLog.ts");
/* harmony import */ var _LoaderManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoaderManager */ "./src/manager/LoaderManager.ts");


/**
  *
  * @author
  *
  */
/**
* Created by yangsong on 15-2-11.
* 资源加载工具类，
* 支持多个resource.json文件加载
* 封装Group的加载
* 增加静默加载机制
*/
class MultipleResCfgLoader extends Laya.EventDispatcher {
    constructor() {
        super();
        this.resGroupPool = {}; //缓存已经解析提取的资源组路径信息
    }
    static getinstance() {
        if (MultipleResCfgLoader._instance) {
            return MultipleResCfgLoader._instance;
        }
        return MultipleResCfgLoader._instance = new MultipleResCfgLoader();
    }
    /**
 * 封装成laya预加载需要格式
 * @param groupName ResGroup中的资源组名
 * 返回参数：laya预加载格式资源数组
 */
    getResArray(groupName) {
        MultipleResCfgLoader.CUR_GROUP_URLS = [];
        MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT = [];
        if (this.resGroupPool[groupName]) {
            // DebugLog.log("从缓存中提取到资源组信息------------");
            return this.resGroupPool[groupName]; //如果已经缓存 则直接返回
        }
        this.loadGroup(groupName);
        this.resGroupPool[groupName] = MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT; //保存到缓存中
        return MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT;
    }
    /**
     * 该接口仅提供给清理缓存资源时使用。预加载时请使用  getResArray()函数，如果使用该函数，当前缓存信息可能为空！！
     * @param groupName
     */
    getNameFromPool(groupName) {
        return this.resGroupPool[groupName];
    }
    /**
     *
     * @param groupName ResGroup中的当前界面的组名
     */
    loadGroup(groupName) {
        if (!groupName.length) {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_0__["default"].log("资源组名称不能为空！" + groupName);
            return "";
        }
        MultipleResCfgLoader.CUR_GROUP_NAME = groupName;
        this.onLoaded();
    }
    onLoaded() {
        if (!this.jsonData) {
            this.jsonData = _LoaderManager__WEBPACK_IMPORTED_MODULE_1__["default"].ins.getRes(MultipleResCfgLoader.RES_GROUP);
            _LoaderManager__WEBPACK_IMPORTED_MODULE_1__["default"].ins.clearRes(MultipleResCfgLoader.RES_GROUP);
        }
        // var json = LoaderManager.ins.getRes(MultipleResCfgLoader.JSON_POSITION);
        this.initGroupKey(this.jsonData);
    }
    /**
     * 通过资源组名获取组内keys给ResGroupMgr.CUR_GROUP_KEYS
     * @param json 资源文件json解析后的对象
     */
    initGroupKey(json) {
        if (!json) {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_0__["default"].log("资源配置json文件读取错误！");
            return;
        }
        MultipleResCfgLoader.CUR_GROUP_KEYS = "";
        var len = json.groups.length;
        var group = null;
        for (var i = 0; i < len; ++i) {
            if (MultipleResCfgLoader.CUR_GROUP_NAME === json.groups[i].name) {
                MultipleResCfgLoader.CUR_GROUP_KEYS = json.groups[i].keys;
                group = json.groups[i];
                break;
            }
        }
        if (!group) {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_0__["default"].log(MultipleResCfgLoader.CUR_GROUP_NAME + " 资源组名字不存在！");
            return;
        }
        if (MultipleResCfgLoader.CUR_GROUP_KEYS === "") {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_0__["default"].log(MultipleResCfgLoader.CUR_GROUP_NAME + " 资源组内容为空！");
            return;
        }
        this.initResUrl(json);
        // DebugLog.log("获取资源组信息: " + group.name + ': ');
    }
    /**
     * 根据keys从resources中寻找类型为json的url
     * @param json 资源文件json解析后的对象
     */
    initResUrl(json) {
        if (!json || MultipleResCfgLoader.CUR_GROUP_KEYS === "")
            return;
        var keysArray = MultipleResCfgLoader.CUR_GROUP_KEYS.split(",");
        var keyLen = keysArray.length, resLen = json.resources.length;
        MultipleResCfgLoader.CUR_GROUP_URLS = [];
        MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT = [];
        for (var i = 0; i < keyLen; ++i) {
            var tempKey = keysArray[i];
            for (var j = 0; j < resLen; ++j) {
                var tempRes = json.resources[j];
                //提取json并封装格式
                if (tempRes.type === "atlas" && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.ATLAS });
                    break;
                    //提取未打包的jpg资源路径并封装格式
                }
                else if (tempRes.type === "json" && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.JSON });
                }
                else if (tempRes.type === "sound" && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.SOUND });
                }
                else if (tempRes.type === "xml" && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.XML });
                }
                else if ((tempRes.type === "buffer" || tempRes.type === "sprite3d") && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.BUFFER });
                }
                else if (tempRes.type === "image" && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.IMAGE });
                } /*else if(tempRes.type === "bin"){
                        DebugLog.log(tempRes.name + ': ' + tempKey);
                    }*/
                else if (tempRes.name === tempKey) {
                    var isJpgFormat = this.isJpgFormat(tempRes.name);
                    if (isJpgFormat) {
                        MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                        MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.IMAGE });
                        break;
                    }
                }
            }
        }
    }
    /**
     * 截取字符串后三位 判定image类型 jpg/png
     */
    isJpgFormat(str) {
        if (str) {
            var len = str.length;
            if (len <= 3)
                return false;
        }
        if ("jpg" === (str[len - 3] + str[len - 2] + str[len - 1]) || "ebp" == (str[len - 3] + str[len - 2] + str[len - 1])) {
            return true;
        }
        return false;
    }
}
MultipleResCfgLoader.RES_GROUP = "resGroup.json"; //不要修改
MultipleResCfgLoader.CUR_GROUP_NAME = ""; //当前使用的资源组名
MultipleResCfgLoader.CUR_GROUP_KEYS = ""; //当前资源组keys
MultipleResCfgLoader.CUR_GROUP_URLS = []; //当前资源组所有json的url 打印验证资源路径使用
MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT = []; //当前资源组所有json的url和类型(预加载格式)
MultipleResCfgLoader._instance = null;


/***/ }),

/***/ "./src/pureMvc/MoudleManager.ts":
/*!**************************************!*\
  !*** ./src/pureMvc/MoudleManager.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MoudleManager; });
/* harmony import */ var _manager_MultipleResCfgLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../manager/MultipleResCfgLoader */ "./src/manager/MultipleResCfgLoader.ts");
/* harmony import */ var _manager_LoaderManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../manager/LoaderManager */ "./src/manager/LoaderManager.ts");
/* harmony import */ var _util_DebugLog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/DebugLog */ "./src/util/DebugLog.ts");



class MoudleManager extends Laya.EventDispatcher {
    constructor() {
        super();
        /**
        *注册 模块。只有先注册了，才能添加和加载模块。
        * */
        this.regModules = {};
        this._moduleDynamicList = {};
        this._loadModuleLen = 0; //此次需要加载的模块数量
        /**
        * 添加模块，然后才能加载模块。
        *  @param dynamicLoading: 需动态加载的资源列表
        * */
        this.loadingModules = [];
        /**
        *开始加载模块,主要是加载模块相关的资源。因为模块的代码，已经打包在一个文件里了。
        * */
        this._info = {};
        this.moduleIsLoading = false;
    }
    static get inst() {
        return this._instance == null ? this._instance = new MoudleManager() : this._instance;
    }
    setup(s, fa) {
        this._stage = s;
        this._fa = fa;
    }
    registerModule(key, commandClassRef) {
        this.regModules[key + ""] = commandClassRef;
    }
    /** 加载启动模块
     * @param	plugins	可为单obj,也可为obj的数组 obj格式是 {key: app.PLUGIN.XXX, dynaimcList: null, info:null}
     * @param   dynaimcList 可为单url，也可数组 'xxxx.png' 或者 [{url: 'res/xxx/0mao1.sk', type: Laya.Loader.BUFFER}]
     * @param   info 模块启动可带的参数
     *  */
    StartModule(plugins) {
        if (plugins instanceof Array) {
            this._loadModuleLen = plugins.length;
            plugins.forEach((obj) => {
                this.addModule(obj.key, obj.info ? obj.info : null, obj.dynaimcList ? obj.dynaimcList : null);
            });
        }
        else {
            this._loadModuleLen = 1;
            this.addModule(plugins.key, plugins.info ? plugins.info : null, plugins.dynaimcList ? plugins.dynaimcList : null);
        }
        this.startLoad();
    }
    addModule(key, param = null, dynamicLoading = null) {
        let item = { key: key, info: param, dynamicList: dynamicLoading };
        this.loadingModules.push(item);
    }
    startLoad() {
        this.loadNext();
    }
    loadNext() {
        if (this.modules == null) {
            this.modules = {};
        }
        if (this.moduleIsLoading)
            return;
        if (this.loadingModules.length) {
            let item = this.loadingModules.shift();
            let key = item["key"];
            this._info[key] = item["info"];
            this._moduleDynamicList[key] = item["dynamicList"];
            let p = this.getModule(key);
            if (!p) {
                p = this.newModuleByKey(key);
                if (p) {
                    this.modules[key] = p;
                    this.loadModule(p, key);
                }
                else {
                    this.loadNext();
                }
            }
            else {
                p.start(this._fa, this._info[key]);
                this.loadNext();
            }
        }
    }
    loadModule(p, key) {
        let resList = p.getResGroup();
        _util_DebugLog__WEBPACK_IMPORTED_MODULE_2__["default"].log(key + ' 模块所需资源组列表====', resList.toString());
        let resArray = [];
        resList.forEach((resKey) => {
            let arr = _manager_MultipleResCfgLoader__WEBPACK_IMPORTED_MODULE_0__["default"].getinstance().getResArray(resKey);
            resArray = resArray.concat(arr);
        });
        let dynamicRes = this._moduleDynamicList[key];
        if (dynamicRes && dynamicRes.length)
            resArray = resArray.concat(dynamicRes);
        if (resArray.length > 0) {
            _manager_LoaderManager__WEBPACK_IMPORTED_MODULE_1__["default"].ins.loadRes(resArray, Laya.Handler.create(this, this.startModule, [p, key]), key);
        }
        else {
            this._loadModuleLen--;
            this.moduleIsLoading = false;
            this.startModule(p, key);
        }
    }
    // private onPluginLoadErr(key:string):void{
    //     DebugLog.log(key + ' 模块资源加载失败');
    // }
    startModule(curMod, key) {
        this.moduleIsLoading = false;
        if (curMod) {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_2__["default"].log('启动模块 。。' + key);
            curMod.start(this._fa, this._info[key]);
            curMod = null;
        }
        this.loadNext();
    }
    /**
    * 通过 模块对应的key来删除模块
    * 模块移除时，也不移除资源。
    * @param key
    */
    killModule(key, clearRes = false) {
        var p = this.modules[key];
        if (p) {
            _util_DebugLog__WEBPACK_IMPORTED_MODULE_2__["default"].log('销毁模块=====', key);
            p.dispose();
            delete this.modules[key];
            if (clearRes)
                this.clearResGroup(key); //清除模块里的资源
        }
    }
    clearResGroup(key) {
        _manager_LoaderManager__WEBPACK_IMPORTED_MODULE_1__["default"].ins.clearRes(null, key);
    }
    checkMoudleExist(key) {
        var p = this.getModule(key);
        if (p) {
            return true;
        }
        else {
            return false;
        }
    }
    killAllModule() {
        for (let key in this.modules) {
            this.killModule(key);
        }
    }
    getModule(key) {
        if (this.modules == null)
            return null;
        var p = this.modules[key];
        return p;
    }
    newModuleByKey(key) {
        var p;
        var commandClassRef = this.regModules[key + ""];
        if (commandClassRef) {
            p = new commandClassRef();
        }
        return p;
    }
}
MoudleManager._instance = null;


/***/ }),

/***/ "./src/pureMvc/SetupManager.ts":
/*!*************************************!*\
  !*** ./src/pureMvc/SetupManager.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SetupManager; });
/* harmony import */ var _ModuleName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModuleName */ "./src/ModuleName.ts");
/* harmony import */ var _app_moudles_loading_LoadingPlugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../app/moudles/loading/LoadingPlugin */ "./src/app/moudles/loading/LoadingPlugin.ts");
/* harmony import */ var _MoudleManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MoudleManager */ "./src/pureMvc/MoudleManager.ts");



/**
 *
 * @author
 * 只负责注册各个模块
 */
class SetupManager {
    constructor() { }
    /**
     *注册所有的模块
     * */
    setupModules() {
        _MoudleManager__WEBPACK_IMPORTED_MODULE_2__["default"].inst.registerModule(_ModuleName__WEBPACK_IMPORTED_MODULE_0__["default"].LAOGING, _app_moudles_loading_LoadingPlugin__WEBPACK_IMPORTED_MODULE_1__["LoadingMoudle"]);
    }
    setup(s, fa) { }
    start() { }
}


/***/ }),

/***/ "./src/pureMvc/core/GM.ts":
/*!********************************!*\
  !*** ./src/pureMvc/core/GM.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GM; });
/* harmony import */ var _Mgr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mgr */ "./src/pureMvc/core/Mgr.ts");
/* harmony import */ var _SetupManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SetupManager */ "./src/pureMvc/SetupManager.ts");


/**
  *
  * @author
  */
class GM extends _Mgr__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
    }
    static getInstance() {
        if (!GM._instance) {
            GM._instance = new GM();
        }
        return GM._instance;
    }
    override_setup_game_managers() {
        // this.super_setupManager("LayerManager",LayerManager);
        // DebugLog.log("override_setup_game_managers");
        this.super_setupManager("SetupManager", _SetupManager__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
    /**
    *图层管理器
    * */
    // public get layer():LayerManager
    // {
    //     var mgr:LayerManager;
    //     mgr = <LayerManager>this.super_getManager("LayerManager");
    //     return mgr;
    // }
    /**
    *模块setup管理器
    * */
    get setupMgr() {
        var mgr;
        mgr = this.super_getManager("SetupManager");
        return mgr;
    }
}


/***/ }),

/***/ "./src/pureMvc/core/Mgr.ts":
/*!*********************************!*\
  !*** ./src/pureMvc/core/Mgr.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mgr; });
/* harmony import */ var _MoudleManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MoudleManager */ "./src/pureMvc/MoudleManager.ts");
/* harmony import */ var _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/DebugLog */ "./src/util/DebugLog.ts");


/**
* 1 继承该管理类，来setup自定义的管理类
* 2 自定义的管理类，需要实现 implements IManager 接口
* 3 在子类添加相应的 get方法。
* 如：public get loader():LoaderManager
*
* 如：
* 调用该方法setup管理类。this.super_setupManager("PluginManager",PluginManager);
*
*
* */
class Mgr {
    constructor() {
        this._managers = {};
    }
    setup(s, fa, fps = 60) {
        this._stage = s;
        this._facade = fa;
        this.super_setupManager("ModuleManager", _MoudleManager__WEBPACK_IMPORTED_MODULE_0__["default"]);
        this.override_setup_game_managers();
    }
    super_setupManager(key, managerClass) {
        var imgr = key == 'ModuleManager' ? _MoudleManager__WEBPACK_IMPORTED_MODULE_0__["default"].inst : new managerClass();
        if (imgr) {
            if (!this._managers[key + ""]) {
                this._managers[key + ""] = imgr;
                imgr.setup(this._stage, this._facade);
                _util_DebugLog__WEBPACK_IMPORTED_MODULE_1__["default"].log("[core] set up manager " + key);
            }
            else {
                console.warn("[core] error manager exist already -> " + key);
            }
        }
    }
    /**
     * get manager by class
     */
    super_getManager(key) {
        var mgr;
        mgr = this._managers[key + ""];
        return mgr;
    }
    /**
     * setup extensive managers
     */
    override_setup_game_managers() {
        throw Error("请使用父类的super_setupManager(key:string)方法 扩展管理器！");
    }
    /**
    *加载管理器
    * */
    get loaderMgr() {
        var ldr;
        ldr = this.super_getManager("LoaderManager");
        return ldr;
    }
}


/***/ }),

/***/ "./src/pureMvc/core/Moudle.ts":
/*!************************************!*\
  !*** ./src/pureMvc/core/Moudle.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Moudle; });
/**
* 模块的基类
*
* 只需要重写 override_registerPureMvcAndStart 方法
* 然后 调用 相应的方法 注册MVC
*/
class Moudle extends Laya.Sprite {
    /**
    * @param resGroup 该模块需要的 res 资源,无res需求的，不用填。默认为空的。
    */
    constructor(resGroup = []) {
        super();
        this._resGroup = [];
        this._resGroup = resGroup;
    }
    start(fa, data = null) {
        this._commandNames = [];
        this._mediatorNames = [];
        this._proxyNames = [];
        this._data = data;
        this.facade = fa;
        this.override_registerPureMvcAndStart();
    }
    dispose() {
        this._autoRemovePureMVC();
        this.facade = null;
    }
    getResGroup() {
        return this._resGroup;
    }
    /**
    * 注册command，当模块移除时，会自动清除注册的command
    */
    super_registerCommand(noteName, commandClassRef) {
        this.facade.registerCommand(noteName, commandClassRef);
        this._commandNames.push(noteName);
    }
    /**
    * 注册mediator，当模块除时，会自动清除注册的mediator
    */
    super_registerMediator(mediator) {
        this.facade.registerMediator(mediator);
        this._mediatorNames.push(mediator.getMediatorName());
    }
    /**
    * 注册proxy，当模块移除时，会自动清除注册的proxy
    */
    super_registerProxy(proxy) {
        this.facade.registerProxy(proxy);
        this._proxyNames.push(proxy.getProxyName());
    }
    /**
    * 在这里 注册puremvc相关的command,proxy,mediator
    * 使用以下方法注册的 模块移除后会自动删除注册的command,proxy,mediator
    * super_registerCommand
    * super_registerMediator
    * super_registerProxy
    */
    override_registerPureMvcAndStart() {
        throw Error("[core] 请在override_registerPureMvcAndStart方法里，注册puremvc相关的command,proxy,mediator");
    }
    /**
    * 加载模块 传递的数据
    */
    get initData() {
        return this._data;
    }
    /**
    * 自动移除super_registerCommand,super_registerMediator,super_registerProxy,注册的pureMVC内容
    */
    _autoRemovePureMVC() {
        if (this._commandNames) {
            var i = this._commandNames.length;
            var key = "";
            //自动移除command
            while (i--) {
                key = this._commandNames[i];
                this.facade.removeCommand(key);
                /////DebugLog.log("[core] remove  command ",key);
            }
            //自动移除mediator
            i = this._mediatorNames.length;
            while (i--) {
                key = this._mediatorNames[i];
                this.facade.removeMediator(key);
                ////DebugLog.log("[core] remove  mediator ",key);
            }
            //自动移除proxy
            i = this._proxyNames.length;
            while (i--) {
                key = this._proxyNames[i];
                this.facade.removeProxy(key);
                ////DebugLog.log("[core] remove  proxy ",key);
            }
        }
        this._commandNames = null;
        this._mediatorNames = null;
        this._proxyNames = null;
    }
}


/***/ }),

/***/ "./src/util/DebugLog.ts":
/*!******************************!*\
  !*** ./src/util/DebugLog.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DebugLog; });
/* harmony import */ var _GlobalDefine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GlobalDefine */ "./src/GlobalDefine.ts");

/*
* name;
*/
class DebugLog {
    static log(message, ...optionalParams) {
        if (!_GlobalDefine__WEBPACK_IMPORTED_MODULE_0__["default"].Debug_log)
            return;
        if (optionalParams.length > 1)
            console.log(message, optionalParams);
        else if (optionalParams.length == 1)
            console.log(message, optionalParams[0]);
        else
            console.log(message);
    }
    static err(message, ...optionalParams) {
        if (!_GlobalDefine__WEBPACK_IMPORTED_MODULE_0__["default"].Debug_log)
            return;
        if (optionalParams.length > 1)
            console.error(message, optionalParams);
        else if (optionalParams.length == 1)
            console.error(message, optionalParams[0]);
        else
            console.error(message);
    }
    static alert(msg) {
        if (!_GlobalDefine__WEBPACK_IMPORTED_MODULE_0__["default"].Debug_log)
            return;
        alert(msg);
    }
}


/***/ }),

/***/ "./src/util/Dictionary.ts":
/*!********************************!*\
  !*** ./src/util/Dictionary.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dictionary; });
class Dictionary {
    constructor() {
        this._keys = [];
        this._values = [];
    }
    /**
    *给指定的键名设置值。
    *@param key 键名。
    *@param value 值。
    */
    set(key, value) {
        let index = this.indexOf(key);
        if (index >= 0) {
            this._values[index] = value;
            return;
        }
        this._keys.push(key);
        this._values.push(value);
    }
    /**
    *返回指定键名的值。
    *@param key 键名对象。
    *@return 指定键名的值。
    */
    get(key) {
        let index = this.indexOf(key);
        return index < 0 ? null : this._values[index];
    }
    /**
    *移除指定键名的值。
    *@param key 键名对象。
    *@return 是否成功移除。
    */
    remove(key) {
        let index = this.indexOf(key);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
    *清除此对象的键名列表和键值列表。
    */
    clear() {
        this._values.length = 0;
        this._keys.length = 0;
    }
    /**
    *获取所有的子元素列表。
    */
    get values() {
        return this._values;
    }
    /**
    *获取所有的子元素键名列表。
    */
    get keys() {
        return this._keys;
    }
    /**
    *获取指定对象的键名索引。
    *@param key 键名对象。
    *@return 键名索引。
    */
    indexOf(key) {
        let index = this._keys.indexOf(key);
        if (index >= 0)
            return index;
        key = ((typeof key == 'string')) ? Number(key) : (((typeof key == 'number')) ? key.toString() : key);
        return this._keys.indexOf(key);
    }
}


/***/ }),

/***/ "./src/util/Helper.ts":
/*!****************************!*\
  !*** ./src/util/Helper.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Helper; });
/* harmony import */ var _pureMvc_MoudleManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pureMvc/MoudleManager */ "./src/pureMvc/MoudleManager.ts");
/* harmony import */ var _GlobalDefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GlobalDefine */ "./src/GlobalDefine.ts");


/**
* name
*/
class Helper {
    constructor() {
    }
    static getSingle(c) {
        let inst;
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
    static isArray(array) {
        return !!(array && array.constructor == Array);
    }
    //为数组Arrary添加一个乱序方法
    static addMixSortToArr() {
        if (!Array.prototype['shuffle']) {
            Array.prototype['shuffle'] = function () {
                for (var j, x, i = this.length; i; j = parseInt((Math.random() * i).toString()), x = this[--i], this[i] = this[j], this[j] = x)
                    ;
            };
        }
    }
    //获取数组里不重复的元素 key: 根据元素里某个属性来判断是否重复
    static getNoRepeatListFromArr(arr, key = null) {
        let temp = [];
        for (let i = 0; i < arr.length; i++) {
            if (!key) {
                if (temp.indexOf(arr[i]) == -1)
                    temp.push(arr[i]);
            }
            else {
                if (temp.indexOf(arr[i][key]) == -1)
                    temp.push(arr[i][key]);
            }
        }
        return temp;
    }
    static deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    static deepCopyArr(arr) {
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
    static StringParseToNumberArray(strSrc, splitChar) {
        if (!strSrc)
            return null;
        let strarr = strSrc.split(splitChar);
        let intArr = [];
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
    static TimeLineFunction(times, funcs, complete) {
        let time = 0;
        for (let i = 0; i < funcs.length; i++) {
            let intervalTime = i < times.length ? times[i] : 0;
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
    static GetRandom(array) {
        let ran_f = Math.random() * array.length;
        let ran_i = Math.floor(ran_f); //获取0~array.length-1的随机整数
        return array[ran_i];
    }
    // 获取最小值到最大值之前的整数随机数
    static GetRandomNumInt(min, max) {
        let range = max - min;
        let rand = Math.random();
        return (min + Math.round(rand * range));
    }
    // 获取最小值到最大值之前的随机数
    static GetRandomNum(min, max) {
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
    static BezierTween(p0, p1, p2, obj, time, delayTime, ease, complete) {
        class BazierPoint {
            constructor(_p0, _p1, _p2, _obj) {
                this.t = 0;
                this.obj = _obj;
                this.p0 = _p0;
                this.p1 = _p1;
                this.p2 = _p2;
            }
            get factor() {
                return this.t;
            }
            set factor(value) {
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
    static getObjKeys(obj) {
        let arr = [];
        for (var key in obj) {
            arr.push(key);
        }
        return arr;
    }
    /**
      *  判断是否为图片
      * */
    static isImgRes(url) {
        let imgs = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];
        let suffix = this.getFileType(url);
        return imgs.indexOf(suffix) != -1;
    }
    /**
      *  判断是否为3d资源
      * */
    static isD3Res(url) {
        let imgs = ['ls', 'lh'];
        let suffix = this.getFileType(url);
        return imgs.indexOf(suffix) != -1;
    }
    /**
      *  判断是否为atlas图集资源
      * */
    static isAtlasRes(url) {
        let imgs = ['atlas'];
        let suffix = this.getFileType(url);
        return imgs.indexOf(suffix) != -1;
    }
    /**
      *  根据url获取文件类型后缀 返回格式为 'png' 等
      * */
    static getFileType(url) {
        return Laya.Utils.getFileExtension(url);
    }
    static isIOS() {
        let ua = window.navigator.userAgent;
        return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }
    static check_support_webp() {
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
    static setLocalCache(key, val) {
        Laya.LocalStorage.setItem(key, val);
    }
    static getLocalCache(key) {
        return Laya.LocalStorage.getItem(key);
    }
    static deleteLocalCache(key) {
        Laya.LocalStorage.removeItem(key);
    }
    //广播
    static SendFacade(name, body, type) {
        puremvc.Facade.getInstance().sendNotification(name, body, type);
    }
    //创建handler
    static Handler(caller, fun, args = null, once = true) {
        return Laya.Handler.create(caller, fun, args, once);
    }
    /** 打开模块
     * @param	names	要打开的模块 可单填模块名 也可以是数组； 例如 ModName.GAMESTATE 或者 [ModName.GAMESTATE, ModName.BaseUI]
     * @param	params	需要携带的数据，如果第一个参数names是数组，那么此参数也必须是数组
     * @param	dynamicUrls	需要动态加载的资源，如果第一个参数names是数组，那么此参数也必须是数组
     *  */
    static openMod(names, params = null, dynamicUrls = null) {
        if (names instanceof Array) {
            let arr = [];
            for (let i = 0; i < names.length; i++) {
                let plguinObj = {};
                plguinObj['key'] = names[i];
                if (params && params[i])
                    plguinObj['info'] = params[i];
                if (dynamicUrls && dynamicUrls[i])
                    plguinObj['dynaimcList'] = dynamicUrls[i];
                arr.push(plguinObj);
            }
            _pureMvc_MoudleManager__WEBPACK_IMPORTED_MODULE_0__["default"].inst.StartModule(arr);
        }
        else {
            _pureMvc_MoudleManager__WEBPACK_IMPORTED_MODULE_0__["default"].inst.StartModule({ key: names, info: params ? params : null, dynaimcList: dynamicUrls ? dynamicUrls : null });
        }
    }
    /** 关闭模块
     * @param	names	要关闭的模块 可单填模块名 也可以是数组； 例如 ModelName.GAMESTATE 或者 [ModelName.GAMESTATE, ModelName.BaseUI]
     *  */
    static closeMod(names) {
        if (names instanceof Array) {
            names.forEach((name) => {
                _pureMvc_MoudleManager__WEBPACK_IMPORTED_MODULE_0__["default"].inst.killModule(name);
            });
        }
        else {
            _pureMvc_MoudleManager__WEBPACK_IMPORTED_MODULE_0__["default"].inst.killModule(names);
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
    static setLanType(type) {
        let lan;
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
        _GlobalDefine__WEBPACK_IMPORTED_MODULE_1__["default"].Language = lan;
    }
    static getColorFilter(R, G, B) {
        return new Laya.ColorFilter([
            R / 255, 0, 0, 0, 0,
            0, G / 255, 0, 0, 0,
            0, 0, B / 255, 0, 0,
            0, 0, 0, 1, 0
        ]);
    }
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/Main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/wanpp/workSpace/PureCore/src/Main.ts */"./src/Main.ts");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map