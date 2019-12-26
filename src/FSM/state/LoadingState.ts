import GameStateBase from "../GameStateBase";
import Helper from "../../util/Helper";
import ModuleName from "../../ModuleName";


//游戏启动模块
export default class LoadingState extends GameStateBase {

    EnterState(info?: any): void {
        super.EnterState(info);

        Helper.openMod(ModuleName.LAOGING);
    }

    ExitState(): void {
        Helper.closeMod(ModuleName.LAOGING);
    }

    onComplete(): void {
       
    }
}