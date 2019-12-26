import MoudleManager from "../MoudleManager";
import IManager from "./IManager";
import LoaderManager from "../../manager/LoaderManager";
import DebugLog from "../../util/DebugLog";


/**
* 1 继承该管理类，来setup自定义的管理类
* 2 自定义的管理类，需要实现 implements IManager 接口
* 3 在子类添加相应的 get方法。
* 如：public get loader():LoaderManager
* 
* 如：
* 调用该方法setup管理类。this.super_setupManager("PluginManager",PluginManager);
* 
* 
* */
export default class Mgr  {
    constructor()  {

    }

    private _stage: Laya.Stage;
    private _facade: puremvc.IFacade;
    public setup(s: Laya.Stage, fa: puremvc.IFacade, fps: number = 60): void  {
        this._stage = s;
        this._facade = fa;

        this.super_setupManager("ModuleManager", MoudleManager);
        this.override_setup_game_managers();
    }

    private _managers: Object = {};
    public super_setupManager(key: string, managerClass: any): void  {
        var imgr: IManager = key == 'ModuleManager' ? MoudleManager.inst : <IManager>new managerClass();
        if (imgr)  {
            if (!this._managers[key + ""])  {
                this._managers[key + ""] = imgr;
                imgr.setup(this._stage, this._facade);
                DebugLog.log("[core] set up manager " + key);
            } else  {
                console.warn("[core] error manager exist already -> " + key);
            }

        }
    }

    /**
     * get manager by class
     */
    protected super_getManager(key: string): any  {
        var mgr: any;
        mgr = this._managers[key + ""];
        return mgr;
    }

    /**
     * setup extensive managers
     */
    protected override_setup_game_managers(): void  {
        throw Error("请使用父类的super_setupManager(key:string)方法 扩展管理器！");
    }

    /**
    *加载管理器
    * */
    public get loaderMgr(): LoaderManager  {
        var ldr: LoaderManager;
        ldr = <LoaderManager>this.super_getManager("LoaderManager");
        return ldr;
    }
}