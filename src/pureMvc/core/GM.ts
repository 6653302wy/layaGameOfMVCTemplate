import Mgr from "./Mgr";
import SetupManager from "../SetupManager";


/**
  *
  * @author 
  */
export default class GM extends Mgr {
    public constructor() {
        super();
    }

    private static _instance: GM;
    static getInstance(): GM  {
        if (!GM._instance)  {
            GM._instance = new GM();
        }
        return GM._instance;
    }

    override_setup_game_managers(): void  {
        // this.super_setupManager("LayerManager",LayerManager);
        // DebugLog.log("override_setup_game_managers");
        this.super_setupManager("SetupManager", SetupManager);
    }

    /**
    *图层管理器
    * */
    // public get layer():LayerManager
    // {
    //     var mgr:LayerManager;
    //     mgr = <LayerManager>this.super_getManager("LayerManager");
    //     return mgr;
    // }

    /**
    *模块setup管理器
    * */
    public get setupMgr(): SetupManager  {
        var mgr: SetupManager;
        mgr = <SetupManager>this.super_getManager("SetupManager");
        return mgr;
    }
}
