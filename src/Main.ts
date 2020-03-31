import UIGloaderExtension from "./fairygui/UIGloaderExtension";
import GamePlayStateManager, {
  GamePlayState
} from "./FSM/GamePlayStateManager";
import GameConfig from "./GameConfig";
import LoaderManager from "./manager/LoaderManager";
import MultipleResCfgLoader from "./manager/MultipleResCfgLoader";
import PlatFormMgr from "./PlatFormMgr";
import GM from "./pureMvc/core/GM";
import DebugLog from "./util/DebugLog";
import Helper from "./util/Helper";
class Main {
  constructor() {
    //根据IDE设置初始化引擎
    if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
    else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
    Laya["Physics"] && Laya["Physics"].enable();
    Laya["DebugPanel"] && Laya["DebugPanel"].enable();
    Laya.stage.scaleMode = GameConfig.scaleMode;
    Laya.stage.screenMode = GameConfig.screenMode;
    Laya.stage.alignV = GameConfig.alignV;
    Laya.stage.alignH = GameConfig.alignH;
    //兼容微信不支持加载scene后缀场景
    Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

    //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
      Laya.enableDebugPanel();
    if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
      Laya["PhysicsDebugDraw"].enable();
    if (GameConfig.stat) Laya.Stat.show();
    Laya.alertGlobalError(false);

    //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    Laya.ResourceVersion.enable(
      "version.json",
      Laya.Handler.create(this, this.onVersionLoaded),
      Laya.ResourceVersion.FILENAME_VERSION
    );

    //启动框架
    GM.getInstance().setup(Laya.stage, puremvc.Facade.getInstance());
    GM.getInstance().setupMgr.setupModules();

    PlatFormMgr.inst.init();

    this.initFont();
  }

  onVersionLoaded(): void {
    //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    Laya.AtlasInfoManager.enable(
      "fileconfig.json",
      Laya.Handler.create(this, this.onConfigLoaded)
    );
  }
  onConfigLoaded() {
    LoaderManager.ins.loadRes(
      MultipleResCfgLoader.RES_GROUP,
      Helper.Handler(this, this.LoadAllGameConfig)
    );
  }
  private LoadAllGameConfig() {
    this.initFGUICfg();

    DebugLog.log("开始游戏====");
    GamePlayStateManager.inst.EnterGoalGameState(GamePlayState.Loading);
  }

  protected initFGUICfg(): void {
    fgui.UIConfig.packageFileExtension = "obj";
    fgui.UIConfig.defaultFont = "huakang";
    fgui.UIObjectFactory.setLoaderExtension(UIGloaderExtension);
    Laya.stage.addChild(fgui.GRoot.inst.displayObject);

    Laya.SoundManager.useAudioMusic = !Laya.Browser.onIOS;
    Laya.SoundManager.autoStopMusic = true;
  }

  protected initFont() {
    const txt: Laya.Text = new Laya.Text();
    txt.text = "曌";
    txt.font = "huakang";
  }
}
//激活启动类
new Main();
