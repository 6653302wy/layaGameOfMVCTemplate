import NetCmd from "../../../NetCmd";
import Moudle from "../../../pureMvc/core/Moudle";
import NetProxy from "./model/NetProxy";
import NetMediator from "./view/NetMediator";

/**
 *
 * @author
 * 与服务器通讯模块
 */
export class Net extends Moudle {
  public constructor() {
    super();
  }

  override_registerPureMvcAndStart(): void {
    this.super_registerProxy(new NetProxy());
    this.super_registerMediator(new NetMediator());

    this.facade.sendNotification(NetCmd.INIT_URLLOADER);
  }
}
