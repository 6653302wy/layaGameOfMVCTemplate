import IManager from "./core/IManager";
import IModule from "./core/IModule";
import MultipleResCfgLoader from "../manager/MultipleResCfgLoader";
import LoaderManager from "../manager/LoaderManager";
import DebugLog from "../util/DebugLog";


export default class MoudleManager extends Laya.EventDispatcher implements IManager {
    constructor() {
        super();
    }

    private static _instance = null;
    public static get inst(): MoudleManager {
        return this._instance == null ? this._instance = new MoudleManager() : this._instance;
    }

    private _stage: Laya.Stage;
    private _fa: puremvc.IFacade;
    private _name: string;

    setup(s: Laya.Stage, fa: puremvc.IFacade): void {
        this._stage = s;
        this._fa = fa;
    }

    /**
    *注册 模块。只有先注册了，才能添加和加载模块。
    * */
    private regModules: Object = {};
    public registerModule(key: string, commandClassRef: any): void {
        this.regModules[key + ""] = commandClassRef;
    }

   
    private modules: Object;
    private _moduleDynamicList: object = {};
    private _loadModuleLen: number = 0; //此次需要加载的模块数量

    /** 加载启动模块
     * @param	plugins	可为单obj,也可为obj的数组 obj格式是 {key: app.PLUGIN.XXX, dynaimcList: null, info:null}
     * @param   dynaimcList 可为单url，也可数组 'xxxx.png' 或者 [{url: 'res/xxx/0mao1.sk', type: Laya.Loader.BUFFER}]
     * @param   info 模块启动可带的参数
     *  */
    public StartModule(plugins: any): void {
        if (plugins instanceof Array) {
            this._loadModuleLen = plugins.length;
            plugins.forEach((obj) => {
                this.addModule(obj.key, obj.info ? obj.info : null, obj.dynaimcList ? obj.dynaimcList : null);
            });
        } else {
            this._loadModuleLen = 1;
            this.addModule(plugins.key, plugins.info ? plugins.info : null, plugins.dynaimcList ? plugins.dynaimcList : null);
        }
        this.startLoad();
    }

    /**
    * 添加模块，然后才能加载模块。
    *  @param dynamicLoading: 需动态加载的资源列表
    * */
    private loadingModules: Object[] = [];
    private addModule(key: string, param: any = null, dynamicLoading: any = null): void {
        let item: Object = { key: key, info: param, dynamicList: dynamicLoading };
        this.loadingModules.push(item);
    }

    /**
    *开始加载模块,主要是加载模块相关的资源。因为模块的代码，已经打包在一个文件里了。
    * */
    private _info: Object = {};
    private moduleIsLoading: boolean = false;
    private startLoad(): void {
        this.loadNext();
    }

    private loadNext(): void {
        if (this.modules == null) {
            this.modules = {};
        }
        if (this.moduleIsLoading) return;

        if (this.loadingModules.length) {
            let item: Object = this.loadingModules.shift();
            let key: string = item["key"];
            this._info[key] = item["info"];
            this._moduleDynamicList[key] = item["dynamicList"];

            let p: IModule = this.getModule(key);
            if (!p) {
                p = this.newModuleByKey(key);
                if (p) {
                    this.modules[key] = p;
                    this.loadModule(p, key);
                } else {
                    this.loadNext();
                }
            } else {
                p.start(this._fa, this._info[key]);
                this.loadNext();
            }
        }
    }


    private loadModule(p: IModule, key: string): void {
        let resList:string[] = p.getResGroup();
        DebugLog.log(key + ' 模块所需资源组列表====', resList.toString());
        let resArray:any[] = [];
        resList.forEach((resKey)=>{
            let arr = MultipleResCfgLoader.getinstance().getResArray(resKey);
            resArray = resArray.concat(arr);
        });
        let dynamicRes = this._moduleDynamicList[key];
        if(dynamicRes && dynamicRes.length)resArray = resArray.concat(dynamicRes);

        if (resArray.length > 0) {
            LoaderManager.ins.loadRes(resArray, Laya.Handler.create(this, this.startModule, [p, key]), key);
        } else {
            this._loadModuleLen--;
            this.moduleIsLoading = false;
            this.startModule(p, key);
        }
    }

    // private onPluginLoadErr(key:string):void{
    //     DebugLog.log(key + ' 模块资源加载失败');
    // }

    private startModule(curMod: IModule, key: string): void {
        this.moduleIsLoading = false;

        if (curMod) {
            DebugLog.log('启动模块 。。' + key);
            curMod.start(this._fa, this._info[key]);
            curMod = null;
        }

        this.loadNext();
    }


    /**
    * 通过 模块对应的key来删除模块
    * 模块移除时，也不移除资源。
    * @param key
    */
    public killModule(key: string, clearRes = false): void {
        var p: IModule = this.modules[key];
        if (p) {
            DebugLog.log('销毁模块=====', key);
            p.dispose();
            delete this.modules[key];
            if(clearRes) this.clearResGroup(key); //清除模块里的资源
        }
    }

    private clearResGroup(key:string):void{
        LoaderManager.ins.clearRes(null, key);
    }

    public checkMoudleExist(key: string): boolean {
        var p: IModule = this.getModule(key);
        if (p) {
            return true;
        } else {
            return false;
        }
    }

    public killAllModule(): void {
        for (let key in this.modules) {
            this.killModule(key);
        }
    }

    private getModule(key: string): IModule {
        if (this.modules == null)
            return null;
        var p: IModule = this.modules[key];
        return p;
    }

    private newModuleByKey(key: string): IModule {
        var p: IModule;
        var commandClassRef: any = this.regModules[key + ""];
        if (commandClassRef) {
            p = <IModule>new commandClassRef();
        }
        return p;
    }



}