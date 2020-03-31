import Moudle from "../../../pureMvc/core/Moudle";
import ResGroup from "../../../ResGroup";
import LoadingMediator from "./view/LoadingMediator";

/**
 *  loading
 */
export class LoadingMoudle extends Moudle {
  constructor() {
    super([ResGroup.Loading]);
  }

  override_registerPureMvcAndStart(): void {
    this.super_registerMediator(new LoadingMediator());
  }
}
