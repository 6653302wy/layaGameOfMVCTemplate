import ModuleName from "../../../../ModuleName";
import NetCmd from "../../../../NetCmd";
import DebugLog from "../../../../util/DebugLog";

/**
  *
  * @author 
  *
  */
export default class NetProxy extends puremvc.Proxy {
    //加载计数器
    private loadernum: number = 0;             //第几次请求
    //加载器对象池
    private _loaders: Array<Laya.HttpRequest> = [];
    //定时器对应关系
    private _timerIds: Array<number> = [];
    private _netMap: Array<Object> = [];//队列
    //时间戳
    private _curTimeStamp: number = 0;

    public constructor() {
        super(ModuleName.NET_PROXY);
        var self = this;
        Laya.timer.frameLoop(1, this, this.checknet);
    }

    checknet() {
        var timestap = new Date().getTime();
        this._curTimeStamp = timestap;
        if (this._netMap.length > 0) {
            if (this._netMap[0]["step"] == "wait") {
                this._netMap[0]["loader"].send(this._netMap[0]["url"], this._netMap[0]["params"], "post", "text");
                this._netMap[0]["timer"] = timestap;
                this._netMap[0]["step"] = "sending";
            } else {
                if (timestap - this._netMap[0]["timer"] > NetCmd.TIME_OUT_CONNECT) {
                    this._netMap[0]["loader"].offAll();
                    this._netMap[0]["loader"].once(Laya.Event.COMPLETE, this, this.onPostComplete, [this._netMap["no"], this._netMap[0]["loader"]]);
                    this._netMap[0]["loader"].once(Laya.Event.ERROR, this, this.Error);
                    this._netMap[0]["loader"].send(this._netMap[0]["url"], this._netMap[0]["params"], "post", "text");
                    this._netMap[0]["timer"] = timestap;
                    //弹出网络有问题提示框
                    DebugLog.log("网络有问题");
                }
            }
        }
    }

    /*
    发送协议
    */
    public addCmd(url: string, params: string = null, no: number = 0): void {
        //创建加载器
        var request: Laya.HttpRequest = new Laya.HttpRequest();
        var loader: Laya.HttpRequest = null;
        if (this._loaders.length > 0) {
            loader = this._loaders.shift();
        }
        else {
            loader = new Laya.HttpRequest();
        }
        loader.once(Laya.Event.COMPLETE, this, this.onPostComplete, [no, loader]);
        loader.once(Laya.Event.ERROR, this, this.Error);
        this._netMap.push({ timer: this._curTimeStamp, loader: loader, url: url, params: params, step: "wait", no: no });
    }

    /*正常获得数据*/
    private onPostComplete(target: any, e: any): void {
        //  rqstMsg.decode(data["rspd"]);
        this.clearLoaderMap(this._netMap[0]["loader"]);
        this._netMap.shift();
        this.facade.sendNotification(NetCmd.BASIC_RECEIVE, e.data);
    }

    /*请求出错*/
    private Error(e: any): void {
        // Const.DEBUG("http协议请求出错："+e.data);
        var tmppLoader: Laya.HttpRequest = <Laya.HttpRequest>e.target;
        //收到数据后保存
        if (this._netMap[0]["url"].indexOf("CGCalcScoreSingleCopyRqst") != -1) {
            this.loadernum++;
            if (this.loadernum == 3) {
                this.loadernum = 0;
                let senddata = this._netMap.shift();
                Laya.timer.clear(this, this.checknet);
            }
        } else {
            // Laya.timer.clear(this, this.checknet);
            this.clearLoaderMap(this._netMap[0]["loader"]);
            this._netMap.shift();
        }
    }

    /**
     * 清除加载记录
     */
    private clearLoaderMap(loader: Laya.HttpRequest): void {
        loader.offAll();
        this._loaders.push(loader);
    }
}
