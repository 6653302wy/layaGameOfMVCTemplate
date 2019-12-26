import Handler = Laya.Handler;
import DebugLog from "../util/DebugLog";
import Dictionary from "../util/Dictionary";
import GameStateBase from "./GameStateBase";
import HomeState from "./state/HomeState";
import LevelState from "./state/LevelState";
import LoadingState from "./state/LoadingState";

export enum GamePlayState {
  UnKnow = 0,
  Loading, //启动阶段
  Home, //主场景
  Level //关卡
}

export default class GamePlayStateManager {
  protected mFSMList: Dictionary = new Dictionary();

  constructor() {
    this.mFSMList.set(GamePlayState.Loading, new LoadingState());
    this.mFSMList.set(GamePlayState.Home, new HomeState());
    this.mFSMList.set(GamePlayState.Level, new LevelState());
  }

  private static _instance: GamePlayStateManager;
  static get inst(): GamePlayStateManager {
    if (!GamePlayStateManager._instance) {
      GamePlayStateManager._instance = new GamePlayStateManager();
    }
    return GamePlayStateManager._instance;
  }

  public static mCurrPlayState: GamePlayState = GamePlayState.UnKnow; //当前状态
  public static mPriorPlayState: GamePlayState = GamePlayState.UnKnow; //前一个状态
  public static mNewState: GamePlayState = GamePlayState.UnKnow; //目标状态

  private state: GameStateBase;
  public EnterGoalGameState(state: GamePlayState): void {
    if (
      GamePlayStateManager.mCurrPlayState !== GamePlayState.UnKnow &&
      state === GamePlayStateManager.mCurrPlayState
    ) {
      return;
    }

    this.ChangeState(state);
  }

  private ChangeState(newState: GamePlayState) {
    GamePlayStateManager.mNewState = newState;
    this.state = this.mFSMList.get(newState);
    if (this.state) {
      DebugLog.log("切换场景========", this.state);
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

  private onComCallBack() {
    DebugLog.log("进入新状态=====");
  }

  private onErrorCallBack() {
    if (GamePlayStateManager.mPriorPlayState !== GamePlayState.UnKnow) {
      this.ChangeState(GamePlayStateManager.mPriorPlayState);
    }
  }

  //可在主模块加载完成调用
  //按需调用，如不使用则要在主模块加载结束后添加
  public OnChangeComplete(succeed: boolean): void {
    if (succeed) {
      if (GamePlayStateManager.mCurrPlayState != GamePlayState.UnKnow)
        this.mFSMList.get(GamePlayStateManager.mCurrPlayState).onComplete();
    } else {
      if (GamePlayStateManager.mCurrPlayState != GamePlayState.UnKnow)
        this.mFSMList.get(GamePlayStateManager.mCurrPlayState).onError();
    }
  }
}
