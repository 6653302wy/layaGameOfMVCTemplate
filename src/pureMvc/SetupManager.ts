import ModuleName from "../ModuleName";
import { LoadingMoudle } from "./../app/moudles/loading/LoadingPlugin";
import IManager from "./core/IManager";
import MoudleManager from "./MoudleManager";

/**
 *
 * @author
 * 只负责注册各个模块
 */
export default class SetupManager implements IManager {
  public constructor() {}

  /**
   *注册所有的模块
   * */
  public setupModules(): void {
    MoudleManager.inst.registerModule(ModuleName.LAOGING, LoadingMoudle);
  }

  setup(s: Laya.Stage, fa: puremvc.IFacade): void {}
  public start(): void {}
}
