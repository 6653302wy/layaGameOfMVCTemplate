import ModuleName from "../../../../ModuleName";
import DebugLog from "../../../../util/DebugLog";
import LoadingView from "./LoadingView";

/**
 *  loading 加载UI
 */
export default class LoadingMediator extends puremvc.Mediator {
  private view: LoadingView;

  constructor() {
    super(ModuleName.LAOGING_MEDIATOR);
  }

  public listNotificationInterests(): string[] {
    return []; //GameEventType.UPDATE_LOADING_PROGRESS
  }

  public handleNotification(notification: puremvc.INotification): void {
    let body: any = notification.getBody();
    switch (
      notification.getName()
      // case GameEventType.UPDATE_LOADING_PROGRESS:
      //     //更新进度条
      //     this.view.setProValue(notification.getBody());
      //     break;
    ) {
    }
  }

  public onRegister(): void {
    DebugLog.log("====打开loading界面==");
    // if (this.view == null) {
    //     this.view = new LoadingView(this);
    // }
    // this.view.show();
  }

  public onRemove(): void {
    if (this.view) this.view.dispose();
    this.view = null;
    // puremvc.Facade.getInstance().sendNotification(GameEventType.LOADING_COMPLETE);
  }
}
