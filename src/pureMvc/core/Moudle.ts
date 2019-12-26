import IModule from "./IModule";

/**
* 模块的基类
*
* 只需要重写 override_registerPureMvcAndStart 方法
* 然后 调用 相应的方法 注册MVC
*/
export default class Moudle extends Laya.Sprite implements IModule  {
    protected facade: puremvc.IFacade;

    private _commandNames: string[];
    private _mediatorNames: string[];
    private _proxyNames: string[];
    private _data: Object;

    /**
    * @param resGroup 该模块需要的 res 资源,无res需求的，不用填。默认为空的。
    */
    constructor(resGroup: string[] = [])  {
        super();
        this._resGroup = resGroup;
    }

    start(fa: puremvc.IFacade, data: Object = null): void  {
        this._commandNames = [];
        this._mediatorNames = [];
        this._proxyNames = [];
        this._data = data;

        this.facade = fa;

        this.override_registerPureMvcAndStart();
    }

    dispose(): void  {
        this._autoRemovePureMVC();
        this.facade = null;
    }

    private _resGroup: string[] = [];
    getResGroup(): string[]  {
        return this._resGroup;
    }

    /**
    * 注册command，当模块移除时，会自动清除注册的command
    */
    protected super_registerCommand(noteName: string, commandClassRef: Function): void  {
        this.facade.registerCommand(noteName, commandClassRef);
        this._commandNames.push(noteName);
    }

    /**
    * 注册mediator，当模块除时，会自动清除注册的mediator
    */
    protected super_registerMediator(mediator: puremvc.IMediator): void  {
        this.facade.registerMediator(mediator);
        this._mediatorNames.push(mediator.getMediatorName());
    }

    /**
    * 注册proxy，当模块移除时，会自动清除注册的proxy
    */
    protected super_registerProxy(proxy: puremvc.IProxy): void  {
        this.facade.registerProxy(proxy);
        this._proxyNames.push(proxy.getProxyName());
    }

    /**
    * 在这里 注册puremvc相关的command,proxy,mediator
    * 使用以下方法注册的 模块移除后会自动删除注册的command,proxy,mediator
    * super_registerCommand
    * super_registerMediator
    * super_registerProxy
    */
    protected override_registerPureMvcAndStart(): void  {
        throw Error("[core] 请在override_registerPureMvcAndStart方法里，注册puremvc相关的command,proxy,mediator");

    }


    /**
    * 加载模块 传递的数据
    */
    public get initData(): Object  {
        return this._data;
    }

    /**
    * 自动移除super_registerCommand,super_registerMediator,super_registerProxy,注册的pureMVC内容
    */
    private _autoRemovePureMVC(): void  {
        if (this._commandNames)  {
            var i: number = this._commandNames.length;
            var key: string = "";

            //自动移除command
            while (i--)  {
                key = this._commandNames[i];
                this.facade.removeCommand(key);
                /////DebugLog.log("[core] remove  command ",key);
            }

            //自动移除mediator
            i = this._mediatorNames.length;
            while (i--)  {
                key = this._mediatorNames[i];
                this.facade.removeMediator(key);
                ////DebugLog.log("[core] remove  mediator ",key);
            }

            //自动移除proxy
            i = this._proxyNames.length;
            while (i--)  {
                key = this._proxyNames[i];
                this.facade.removeProxy(key);
                ////DebugLog.log("[core] remove  proxy ",key);
            }
        }

        this._commandNames = null;
        this._mediatorNames = null;
        this._proxyNames = null;
    }
}

