import Moudle from "../../../pureMvc/core/Moudle";
import LoadingMediator from "./view/LoadingMediator";
import ResGroup from "../../../ResGroup";

/**
*  loading 
*/
export class LoadingPlugin extends Moudle {
	constructor() {
		super([ResGroup.Loading]);
	}

	override_registerPureMvcAndStart(): void {
		this.super_registerMediator(new LoadingMediator());
	}

}