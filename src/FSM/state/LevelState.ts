import GameStateBase from "../GameStateBase";
import Helper from "../../util/Helper";
import ModuleName from "../../ModuleName";


//游戏启动模块
export default class LevelState extends GameStateBase {

    EnterState(info?: any): void {
        super.EnterState(info);

        Helper.openMod(ModuleName.GAME_LEVEL);
    }

    ExitState(): void {
        Helper.closeMod(ModuleName.GAME_LEVEL);
    }

    onComplete(): void {
       
    }
}