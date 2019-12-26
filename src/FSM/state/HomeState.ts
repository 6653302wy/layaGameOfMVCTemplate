import GameStateBase from "../GameStateBase";
import Helper from "../../util/Helper";
import ModuleName from "../../ModuleName";


//游戏启动模块
export default class HomeState extends GameStateBase {

    EnterState(info?: any): void {
        super.EnterState(info);

        Helper.openMod(ModuleName.HOME_PANEL);
    }

    ExitState(): void {
        Helper.closeMod(ModuleName.HOME_PANEL);
    }

    onComplete(): void {
       
    }
}