import Dictionary from "../util/Dictionary";
import LoaderManager from "./LoaderManager";
import Helper from "../util/Helper";


export default class D3ResManager {
    private relaseMaxSize: number = 40;
    public useSprite3DurlList: Dictionary = new Dictionary();	//记录已加载的服饰模型url key： url， value： 计数。 
    public useCiteResList: string[] = []; //所有通过create接口下载的资源
    private _curAvatarList: string[] = [];

    constructor() {
    }

    private static _instance = null;
    public static get ins(): D3ResManager {
        return this._instance == null ? this._instance = new D3ResManager() : this._instance;
    }

    //计数已使用的资源
    public OnSprite3DLoadSuccess(resUrls: string[]): void {
        for (let url of resUrls) {
            if (this.useSprite3DurlList.keys.indexOf(url) != -1) {
                let num: number = this.useSprite3DurlList.get(url);
                this.useSprite3DurlList.set(url, num + 1);
            }
        }

        if (this.useSprite3DurlList.keys.length >= this.relaseMaxSize) {
            this.clearLastNoUse(resUrls.length);
        }
    }

    public OnSprite3DFreeExternal(urls: any[]) {
        for (let url of urls) {
            if (this.useSprite3DurlList.keys.indexOf(url) != -1) {
                let num: number = this.useSprite3DurlList.get(url);
                this.useSprite3DurlList.set(url, num >= 1 ? num - 1 : 0);
            }
        }
    }

    /**
     * 设置当前身上的avatar
     * @param list 
     */
    public setCurAvatarList(list: string[]): void {
        this._curAvatarList = list;
    }


     /** 获取3d对象
     * @param	url	要获取对象的url 若已下载 立即返回，否则需先加载再返回
     * @param	comHdr	加载结束回调，返回对象
     * @param	waitTime		加载等待时间 如果加载超过设定的等待时间，则返回null,使用时自行判断并做容错处理（资源的加载并未停止）
     * @param	errHdr		加载出错的回调
     *  */
    public getSprite3D(url: string, comHdr: Laya.Handler, waitTime: number = -1, errHdr: Laya.Handler = null): void {
        if (errHdr) LoaderManager.ins.errHdrList.set(url, { url: url, cb: errHdr }); //错误处理

        let temp: any = LoaderManager.ins.getRes(url);
        if (temp) {
            temp.active = true;
            comHdr.runWith(temp);
        } else {
            LoaderManager.ins.loadRes(url, Laya.Handler.create(this, (result) => {
                comHdr.runWith(result);
            }), null, waitTime);
            
        }
    }

     /** 克隆3d对象
     * @param	url	要获取对象的url 若已下载 立即返回，否则需先加载再返回
     * @param	comHdr	加载结束回调，返回对象
     * @param	waitTime		加载等待时间 如果加载超过设定的等待时间，则返回null,使用时自行判断并做容错处理（资源的加载并未停止）
     * @param	errHdr		加载出错的回调
     *  */
    public cloneSprite3D(url: string, comHdr: Laya.Handler, waitTime: number = -1, errHdr: Laya.Handler = null): void {
        if (errHdr) LoaderManager.ins.errHdrList.set(url, { url: url, cb: errHdr }); //错误处理

        this.getSprite3D(url, Helper.Handler(this, (d3Obj) => {
            if (d3Obj) {
                let temp: Laya.Sprite3D = d3Obj.clone();//Laya.Sprite3D.instantiate(LoaderManager.ins.getRes(url));
                comHdr.runWith(temp);
            } else {
                comHdr.runWith(null);
            }
        }), waitTime);
    }

     /** 销毁3d对象
     * @param	obj	   销毁的3d对象
     * @param	clearRes	是否要同时清理资源
     *  */
    public destorySprite3D(obj: Laya.Sprite3D, clearRes:boolean = false): void {
        if (!obj) return;
        obj.active = false;
        obj.destroy(true);
        // if(clearRes)ResManager.ins.clearRes(obj.url);
        obj = null;
    }

    /** 清理3d对象资源
     *  */
    public clearD3Res(url:string):void{
        // ResManager.ins.clearRes(url);
    }

    private addUseSprite3DurlList(urls: any): void {
        if (urls instanceof Array) {
            for (let urlObj of urls) {
                if (!this.checkIsExist(urlObj.url) && LoaderManager.ins.getRes(urlObj.url)) this.useCiteResList.push(urlObj.url);
            }
        } else {
            if (!this.checkIsExist(urls) && LoaderManager.ins.getRes(urls)) this.useCiteResList.push(urls);
        }
    }

    /**是否已存在 */
    private checkIsExist(url: string): boolean {
        return this.useCiteResList.indexOf(url) != -1 && LoaderManager.ins.getRes(url);
    }

    //自动清除换装列表里不用的资源
    private clearLastNoUse(num: number): void {
        let clearUrls: string[] = [];
        let temp: number = 0;
        this.useSprite3DurlList.keys.forEach((url) => {
            if (this.useSprite3DurlList.get(url) == 0) {
                temp++;
                if (temp > num) return false;

                this.useSprite3DurlList.remove(url);
                this.clearD3Res(url);
            }
        });
    }


}