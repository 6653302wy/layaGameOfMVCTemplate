import Dictionary from "../util/Dictionary";
import DebugLog from "../util/DebugLog";
import MultipleResCfgLoader from "./MultipleResCfgLoader";
import Helper from "../util/Helper";

export default class LoaderManager {
    private static _instance = null;
    public errHdrList: Dictionary = new Dictionary();
    private loaderList: Dictionary = new Dictionary();

    constructor() {
        Laya.loader.on(Laya.Event.ERROR, this, this.onLoaingError);
    }
    public static get ins(): LoaderManager {
        return this._instance == null ? this._instance = new LoaderManager() : this._instance;
    }

    /** 加载资源
     * @param	url	要加载的单个资源地址或资源信息数组。比如：简单数组：["a.png","b.png"] 复杂数组[{url: 'xx.png', type: Loader.IMAGE},...]
     * @param	comHdr	加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
     * @param	groupName	组名 不填默认为资源url url为数组时，取第一个资源的url
     * @param	waitTime		加载等待时间 如果加载超过设定的等待时间，则返回null,使用时自行判断并做容错处理（资源的加载并未停止）
     * @param	errHdr		加载出错的回调
     * @param	isStatic		是否静态常驻的资源 常驻的资源不会自动清理， 不常驻的资源会根据需要自动清理
     * @param	alwayscb		默认为true, 资源加载无论成功失败，都返回complete回调； 否则为false,失败不返回complete回调
     *  */
    public loadRes(url: any, comHdr: Laya.Handler = null, groupName: string = null, waitTime: number = 0, errHdr: Laya.Handler = null, isStatic: boolean = false, alwayscb: boolean = true): void {
        let groupKey: string;
        if (url instanceof Array) {
            let tempUrl = this.getRealUrl(url[0]) + '_group';
            groupKey = groupName == null ? this.getRealUrl(tempUrl) : groupName;
        } else {
            groupKey = groupName == null ? this.getRealUrl(url) : groupName;
        }

        if (this.checkAllLoaded(url)) {
            DebugLog.log(groupKey + ' 已下载，直接返回回调。。');
            if (comHdr) comHdr.run();
            return;
        }

        if (this.loaderList.get(groupKey)) { //有重复加载请求，判断回调是否也相同
            let cb: Laya.Handler = this.loaderList.get(groupKey)['cb'];
            if (cb && comHdr && (comHdr != cb)) {
                groupKey += '_1';
            } else {
                DebugLog.log('有重复提交的加载请求，请检查代码=======');
                this.loadNext();
                return;
            }
        }
        this.loaderList.set(groupKey, { url: url, cb: comHdr, wait: waitTime, static: isStatic, needscb: alwayscb });

        if (errHdr) this.errHdrList.set(groupKey, { url: url, cb: errHdr }); //错误处理

        this.loadNext();
    }

    /** 加载组资源
     * @param	groupName	要加载的组资源名
     * @param	comHdr	加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
     * @param	waitTime		加载等待时间 如果加载超过设定的等待时间，则返回null,使用时自行判断并做容错处理（资源的加载并未停止）
     * @param	errHdr		加载出错的回调
     * @param	isStatic		是否静态常驻的资源 常驻的资源不会自动清理， 不常驻的资源会根据需要自动清理
     * @param	alwayscb		默认为true, 资源加载无论成功失败，都返回complete回调； 否则为false,失败不返回complete回调
     *  */
    public loadResGroup(groupName: string, comHdr: Laya.Handler = null, waitTime: number = 0, errHdr: Laya.Handler = null, isStatic: boolean = false, alwayscb: boolean = true): void {
        let resList: any[] = MultipleResCfgLoader.getinstance().getResArray(groupName);
        if (resList && resList.length) this.loadRes(resList, comHdr, groupName, waitTime, errHdr, isStatic, alwayscb);
    }

    /** 获取资源对象 */
    public getRes(url: string) {
        // ResManager.ins.setResUseCount(url);
        return Laya.loader.getRes(url);
    }

    /** 清理资源 */
    public clearRes(url: string, groupName: string = null) {
        // ResManager.ins.clearRes(url, groupName);
        Laya.loader.clearRes(url);
    }

    /** 清理未加载的内容 */
    public cancleLoader(url: any): void {
        if (url instanceof Array) Laya.loader.cancelLoadByUrls(url);
        else Laya.loader.cancelLoadByUrl(url);
    }

    private curLoadGroup: string;
    private isLoaing: boolean = false;
    private d2ResLoadCom: boolean = false;
    private d3ResLoadCom: boolean = false;
    private curWaitTime: number;
    private loadNext(): void {
        if (this.isLoaing) return;
        if (this.loaderList.keys.length == 0) return;

        this.curLoadGroup = this.loaderList.keys[0];
        let loaderUrl = this.loaderList.get(this.curLoadGroup)['url'];
        this.curWaitTime = this.loaderList.get(this.curLoadGroup)['wait'];

        let d2ResList: Object[] = [];
        let d3ResList: string[] = [];

        let addLoaderList = (url) => {
            let tempUrl = this.getRealUrl(url);
            if (Helper.isD3Res(tempUrl)) {
                d3ResList.push(tempUrl);
            } else {
                if (typeof url == 'string') d2ResList.push({ url: url, type: null });
                else d2ResList.push(url);
            }
        }

        if (loaderUrl instanceof Array) {
            loaderUrl.forEach((url) => {
                addLoaderList(url);
            });
        } else {
            addLoaderList(loaderUrl);
        }

        this.d2ResLoadCom = !Boolean(d2ResList.length);
        this.d3ResLoadCom = !Boolean(d3ResList.length);

        if (!this.d2ResLoadCom || !this.d3ResLoadCom) this.startLoad(d2ResList, d3ResList);
    }

    private totalCheckTime: number = 20000; //加载检测总时长
    private checkRate: number = 5000; //间隔多久检测一次
    private startTime: number;
    private startLoad(d2List: any[], d3List: string[]): void {
        this.isLoaing = true;

        this.startTime = new Date().getTime();
        if (this.curWaitTime > 0) Laya.timer.loop(10, this, this.waitingTimerHdr);
        Laya.timer.loop(this.checkRate, this, this.checkLoadingStateHdr);

        if (d2List.length) Laya.loader.load(d2List, Helper.Handler(this, this.onD2LoadingComHdr), Laya.Handler.create(this, this.onLoadingProgressHdr, null, false), null, 1, true, this.curLoadGroup);
        if (d3List.length) Laya.loader.create(d3List, Helper.Handler(this, this.onD3LoadingComHdr), Laya.Handler.create(this, this.onLoadingProgressHdr, null, false));
    }

    private onD2LoadingComHdr(result: any): void {
        if (result == null || result == false) {
            DebugLog.log(this.curLoadGroup + ' 2d资源加载未完成。。');
            if (!this.loaderList.get(this.curLoadGroup)['needscb']) {
                this.stopCheck();
                return;
            }
        }
        this.d2ResLoadCom = true;

        if (this.d2ResLoadCom && this.d3ResLoadCom) {
            this.loadingComHdr(result);
        }
    }

    private onD3LoadingComHdr(result: any): void {
        if (result == null || result == false) {
            DebugLog.log(this.curLoadGroup + ' 3d资源加载未完成。。');
            if (!this.loaderList.get(this.curLoadGroup)['needscb']) {
                this.stopCheck();
                return;
            }
        }
        this.d3ResLoadCom = true;

        if (this.d2ResLoadCom && this.d3ResLoadCom) {
            this.loadingComHdr(result);
        }
    }

    private loadingComHdr(res: any): void {
        this.isLoaing = false;
        this.stopWaiting();
        this.stopCheck();

        let key: string = this.curLoadGroup;
        let loadingUseTime = new Date().getTime() - this.startTime; //加载所用的时长
        if (res) {
            DebugLog.log(this.curLoadGroup + ' 加载完成，所用时长：' + loadingUseTime + ' ms');
        } else {
            DebugLog.log(this.curLoadGroup + ' 加载未完成，所用时长：' + loadingUseTime + ' ms');
        }


        let cb: Laya.Handler = this.loaderList.get(this.curLoadGroup)['cb'];
        let cb_1: Laya.Handler;
        if (this.loaderList.get(this.curLoadGroup + '_1')) {//相同资源的加载，不同的回调
            cb_1 = this.loaderList.get(this.curLoadGroup + '_1')['cb'];
            this.loaderList.remove(this.curLoadGroup + '_1');
        }
        let waitTime: number = this.loaderList.get(this.curLoadGroup)['wait'];
        // ResManager.ins.setLoadedRes(this.curLoadGroup, this.loaderList.get(this.curLoadGroup)['url'], this.loaderList.get(this.curLoadGroup)['static']);
        this.loaderList.remove(this.curLoadGroup);
        this.curLoadGroup = null;
        this.loadNext();

        if (cb_1) cb_1.runWith(res);
        if (cb) {
            if (waitTime > 0 && loadingUseTime > (waitTime + 10)) { //容差10毫秒
                DebugLog.log(key + ' 加载超过设定等待时间' + waitTime + ' ms ,不执行回调==');
                return;
            }
            cb.runWith(res);
        }
    }

    private waitingTimerHdr(): void {
        let loadingUseTime = new Date().getTime() - this.startTime; //加载所用的时长
        // DebugLog.log('[' + this.curLoadGroup + ']' + ' 检测下载时长== ', loadingUseTime);
        if (loadingUseTime > this.curWaitTime) {
            this.stopWaiting();
            if (!this.checkAllLoaded(this.loaderList.get(this.curLoadGroup)['url'])) { //未加载完
                let cb: Laya.Handler = this.loaderList.get(this.curLoadGroup)['cb'];
                DebugLog.log(this.curLoadGroup + ' 加载超过设定等待时间==,返回null');
                if (cb) cb.runWith(null);
            }
        }
    }
    private stopWaiting(): void {
        this.curWaitTime = 0;
        Laya.timer.clear(this, this.waitingTimerHdr);
    }

    private checkLoadingStateHdr(): void {
        this.totalCheckTime -= this.checkRate;
        DebugLog.log(this.curLoadGroup + ' ===loading检测：', this.totalCheckTime);

        if (this.totalCheckTime <= 0) {
            this.stopCheck();

            let urls = this.loaderList.get(this.curLoadGroup)['url'];
            if (this.checkAllLoaded(urls)) {
                DebugLog.log('检测到资源已全部下载完成--------', this.curLoadGroup);
                if (urls instanceof Array) {
                    this.loadingComHdr(true);
                } else {
                    this.loadingComHdr(this.getRes(this.getRealUrl(urls)));
                }
            } else {
                DebugLog.log('加载超时未完成。。。。');
                // this.alertToRefresh();
            }
        }
    }

    private alertToRefresh(): void {
        let alertStr = '加载超时未完成,检查资源路径或网络';
        window.alert(alertStr);
        location.reload();
    }

    private stopCheck(): void {
        Laya.timer.clear(this, this.checkLoadingStateHdr);
        this.totalCheckTime = 20000;
    }

    private onLoadingProgressHdr(pro: number): void {
        // DebugLog.log(this.curLoadGroup + ' Loading...' + Math.round(pro * 100));
    }

    /**
    *  根据url获取文件类型后缀 返回格式为 'png' 等
   * */
    public getFileType(url): string {
        return Laya.Utils.getFileExtension(url);
    }

    public checkAllLoaded(urls: any): boolean {
        let bo: boolean = true;

        let check = (url) => {
            let res = this.getRealUrl(url);
            if (!Laya.loader.getRes(res)) {
                return false;
            }
            return true;
        }

        if (urls instanceof Array) {
            for (let i = 0; i < urls.length; i++) {
                bo = check(urls[i]);
                if (!bo) break;
            }
            // urls.forEach((resUrl) => {
            //     bo = check(resUrl);
            //     if(!bo)return false;
            // });
        } else {
            bo = check(urls);
        }

        return bo;
    }

    public getRealUrl(url: any): string {
        return typeof (url) == 'string' ? url : url['url'];
    }

    private onLoaingError(errUrl): void {
        // console.error('资源LD错误===' + errUrl);
        this.isLoaing = false;
        Laya.loader.clearRes(errUrl);

        let cb: Laya.Handler;
        this.errHdrList.keys.forEach((key) => {
            if (cb) return false;

            let loaderList = this.errHdrList.get(key);
            let tempUrl: string;
            if (loaderList.url instanceof Array) {
                loaderList.url.forEach((data) => {
                    tempUrl = this.getRealUrl(data);
                    if (tempUrl == errUrl) {
                        cb = loaderList.cb;
                        // this.errHdrList.remove(key);
                        return false;
                    }
                });
            } else {
                tempUrl = this.getRealUrl(loaderList.url);
                if (tempUrl == errUrl) {
                    cb = loaderList.cb;
                    this.errHdrList.remove(key);
                    return false;
                }
            }
        });

        if (cb) cb.runWith(errUrl);
    }



}