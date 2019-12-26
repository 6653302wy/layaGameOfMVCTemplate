import Helper from "./util/Helper";
import DebugLog from "./util/DebugLog";

export default class PlatFormMgr {

    public mPlatAdReady: boolean = false; //平台广告是否加载好


    constructor() {
    }
    private static _instance: PlatFormMgr;
    public static get inst():PlatFormMgr{
        return Helper.getSingle(PlatFormMgr);
        // return this._instance == null ? this._instance = new PlatFormMgr() : this._instance;
    }
   
    public init(): void {
        this.mPlatAdReady = true;
    }

    public requestPayment(offerId: string, buyNum: number, env: number, cb: Laya.Handler = null): void {
    }

}

export enum PLATFORM_TYPE {
    AD,
    BUY
}