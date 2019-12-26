
    let BASE_CMD: number = 0;
    let MsgSeq_Index: number = 0;
    let Game_Url = 'http://172.16.64.55:5555/mobile/';

    let getMsgSeq = function (): number {
        return ++MsgSeq_Index;
    }
    let unhandleRequestError = function (data): void {
        console.error('unhandleRequestError:' + data);
    };

    let wrapSendMsg = function (caller, completeCallback, errorCallback, progressCallback): void {
        var hr = new laya.net.HttpRequest();
        hr.once('complete', this, function (data) {
            if (completeCallback) {
                completeCallback.call(caller, data);
            }
        });
        hr.once('progress', this, function (data) {
            if (progressCallback) {
                progressCallback.call(caller, data);
            }
        });
        hr.once('error', this, function (data) {
            (errorCallback || unhandleRequestError).call(caller, data);
        });
        console.debug('http request, url:' + Game_Url + ', body:' + 'c=' + this.getCmd() + '&r=' + JSON.stringify(this.encode()) + '&o=1');
        hr.send(Game_Url, 'c=' + this.getCmd() + '&r=' + JSON.stringify(this.encode()) + '&o=1', 'post', 'text');
    };

    abstract class HttpRqstBase {
        abstract getCmd(): number;
        abstract encode();
        send(caller, completeCallback, errorCallback, progressCallback): void {
            wrapSendMsg.call(this, caller, completeCallback, errorCallback, progressCallback);
        }
    }

    abstract class HttpRspdBase {
        abstract getCmd(): number;
        abstract decode(data);
    }

    export function parseHttpResponse(data, expectMsgType) {
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        var msg = new expectMsgType();
        msg.decode(data);
        return msg;
    }

    export function setGameUrl(url: string): void {
        Game_Url = url;
    }

    export const Constants = {
        PROTO_VERTION: 2019052901,
        CG_LoginRqst: BASE_CMD + 100,
        GC_LoginRspd: BASE_CMD + 101,
        CG_UseItemRqst: BASE_CMD + 102,
        GC_UseItemRspd: BASE_CMD + 103,
        CG_GetItemRqst: BASE_CMD + 104,
        GC_GetItemRspd: BASE_CMD + 105,
        CG_LevelStartRqst: BASE_CMD + 106,
        GC_LevelStartRspd: BASE_CMD + 107,
        CG_LevelEndRqst: BASE_CMD + 108,
        GC_LevelEndRspd: BASE_CMD + 109
    };

    export enum EErrorCode {
        EEC_OK = 0,
        EEC_Failed = 1,
        EEC_ItemNotEnough = 2,
        EEC_MoneyNotEnough = 3,
        EEC_End = 4
    }

    export enum EDataType {
        UserData = 1,
        ItemList = 2
    }

    export class ItemInfo {
        public itemId: number;
        public count: number;
        constructor() {
            this.itemId = 0;
            this.count = 0;
        }
        encode() {
            var encodeObj = {};
            if (this.itemId) {
                encodeObj['b'] = this.itemId;
            }
            if (this.count) {
                encodeObj['c'] = this.count;
            }
            return encodeObj;
        }
        decode(data) {
            if (!data) {
                return this;
            }
            if (data.b) {
                this.itemId = parseInt(data.b) || 0;
            }
            if (data.c) {
                this.count = parseInt(data.c) || 0;
            }
            return this;
        }
    }

    export enum EPlatformType {
        TEST = 0,
        WX = 1,
        OPPO = 2,
        VIVO = 3,
        BAIDU = 4,
        TOUTIAO = 5,
        XIAOMI = 6
    }

    export enum EGetItemType {
        Ad = 0,
        Share = 1
    }

    export enum EPaymentType {
        TEST = 0,
        WX = 1,
        OPPO = 2,
        VIVO = 3,
        BAIDU = 4,
        TOUTIAO = 5,
        XIAOMI = 6
    }

    export class CGLoginRqst extends HttpRqstBase {
        private msgSeq: number;
        public platform: EPlatformType; //enum EPlatformType
        public account: string;
        public code: string;
        constructor() {
            super();
            this.msgSeq = getMsgSeq();
            this.platform = 0;
            this.account = "";
            this.code = "";
        }
        getCmd(): number {
            return Constants.CG_LoginRqst;
        }
        getUrl(): string {
            return "CGLoginRqst";
        }
        encode() {
            var encodeObj = {};
            encodeObj['_0'] = this.msgSeq;
            if (this.platform) {
                encodeObj['c'] = this.platform;
            }
            if (this.account) {
                encodeObj['d'] = this.account;
            }
            if (this.code) {
                encodeObj['e'] = this.code;
            }
            return encodeObj;
        }
    }

    export class GCLoginRspd extends HttpRspdBase {
        private msgSeq: number;
        public errorCode: number;
        public account: string;
        public loginToken: string;
        public levelId: number;
        public itemList: ItemInfo[];
        constructor() {
            super();
            this.msgSeq = 0;
            this.errorCode = 0;
            this.account = "";
            this.loginToken = "";
            this.levelId = 0;
            this.itemList = [];
        }
        getCmd(): number {
            return Constants.GC_LoginRspd;
        }
        getUrl(): string {
            return "GCLoginRspd";
        }
        decode(data) {
            if (!data) {
                return this;
            }
            if (data._0) {
                this.msgSeq = parseInt(data._0);
            }
            if (data.c) {
                this.errorCode = parseInt(data.c) || 0;
            }
            if (data.d) {
                this.account = data.d.toString();
            }
            if (data.e) {
                this.loginToken = data.e.toString();
            }
            if (data.f) {
                this.levelId = parseInt(data.f) || 0;
            }
            if (data.g) {
                this.itemList.splice(0, this.itemList.length);
                for (var itemListIndex = 0; itemListIndex < data.g.length; ++itemListIndex) {
                    var tmpItemListObj = new ItemInfo();
                    ItemInfo.prototype.decode.call(tmpItemListObj, data.g[itemListIndex]);
                    this.itemList.push(tmpItemListObj);
                }
            }
            return this;
        }
    }

    export class CGUseItemRqst extends HttpRqstBase {
        private msgSeq: number;
        public itemId: number;
        public count: number;
        constructor() {
            super();
            this.msgSeq = getMsgSeq();
            this.itemId = 0;
            this.count = 0;
        }
        getCmd(): number {
            return Constants.CG_UseItemRqst;
        }
        getUrl(): string {
            return "CGUseItemRqst";
        }
        encode() {
            var encodeObj = {};
            encodeObj['_0'] = this.msgSeq;
            if (this.itemId) {
                encodeObj['c'] = this.itemId;
            }
            if (this.count) {
                encodeObj['d'] = this.count;
            }
            return encodeObj;
        }
    }

    export class GCUseItemRspd extends HttpRspdBase {
        private msgSeq: number;
        public errorCode: number;
        public itemId: number;
        public count: number;
        constructor() {
            super();
            this.msgSeq = 0;
            this.errorCode = 0;
            this.itemId = 0;
            this.count = 0;
        }
        getCmd(): number {
            return Constants.GC_UseItemRspd;
        }
        getUrl(): string {
            return "GCUseItemRspd";
        }
        decode(data) {
            if (!data) {
                return this;
            }
            if (data._0) {
                this.msgSeq = parseInt(data._0);
            }
            if (data.c) {
                this.errorCode = parseInt(data.c) || 0;
            }
            if (data.d) {
                this.itemId = parseInt(data.d) || 0;
            }
            if (data.e) {
                this.count = parseInt(data.e) || 0;
            }
            return this;
        }
    }

    export class CGGetItemRqst extends HttpRqstBase {
        private msgSeq: number;
        public type: EGetItemType; //enum EGetItemType
        public itemId: number;
        constructor() {
            super();
            this.msgSeq = getMsgSeq();
            this.type = 0;
            this.itemId = 0;
        }
        getCmd(): number {
            return Constants.CG_GetItemRqst;
        }
        getUrl(): string {
            return "CGGetItemRqst";
        }
        encode() {
            var encodeObj = {};
            encodeObj['_0'] = this.msgSeq;
            if (this.type) {
                encodeObj['c'] = this.type;
            }
            if (this.itemId) {
                encodeObj['d'] = this.itemId;
            }
            return encodeObj;
        }
    }

    export class GCGetItemRspd extends HttpRspdBase {
        private msgSeq: number;
        public errorCode: number;
        public itemId: number;
        public count: number;
        constructor() {
            super();
            this.msgSeq = 0;
            this.errorCode = 0;
            this.itemId = 0;
            this.count = 0;
        }
        getCmd(): number {
            return Constants.GC_GetItemRspd;
        }
        getUrl(): string {
            return "GCGetItemRspd";
        }
        decode(data) {
            if (!data) {
                return this;
            }
            if (data._0) {
                this.msgSeq = parseInt(data._0);
            }
            if (data.c) {
                this.errorCode = parseInt(data.c) || 0;
            }
            if (data.d) {
                this.itemId = parseInt(data.d) || 0;
            }
            if (data.e) {
                this.count = parseInt(data.e) || 0;
            }
            return this;
        }
    }

    export class CGLevelStartRqst extends HttpRqstBase {
        private msgSeq: number;
        public levelId: number;
        constructor() {
            super();
            this.msgSeq = getMsgSeq();
            this.levelId = 0;
        }
        getCmd(): number {
            return Constants.CG_LevelStartRqst;
        }
        getUrl(): string {
            return "CGLevelStartRqst";
        }
        encode() {
            var encodeObj = {};
            encodeObj['_0'] = this.msgSeq;
            if (this.levelId) {
                encodeObj['c'] = this.levelId;
            }
            return encodeObj;
        }
    }

    export class GCLevelStartRspd extends HttpRspdBase {
        private msgSeq: number;
        public errorCode: number;
        constructor() {
            super();
            this.msgSeq = 0;
            this.errorCode = 0;
        }
        getCmd(): number {
            return Constants.GC_LevelStartRspd;
        }
        getUrl(): string {
            return "GCLevelStartRspd";
        }
        decode(data) {
            if (!data) {
                return this;
            }
            if (data._0) {
                this.msgSeq = parseInt(data._0);
            }
            if (data.c) {
                this.errorCode = parseInt(data.c) || 0;
            }
            return this;
        }
    }

    export class CGLevelEndRqst extends HttpRqstBase {
        private msgSeq: number;
        public levelId: number;
        constructor() {
            super();
            this.msgSeq = getMsgSeq();
            this.levelId = 0;
        }
        getCmd(): number {
            return Constants.CG_LevelEndRqst;
        }
        getUrl(): string {
            return "CGLevelEndRqst";
        }
        encode() {
            var encodeObj = {};
            encodeObj['_0'] = this.msgSeq;
            if (this.levelId) {
                encodeObj['c'] = this.levelId;
            }
            return encodeObj;
        }
    }

    export class GCLevelEndRspd extends HttpRspdBase {
        private msgSeq: number;
        public errorCode: number;
        public isPass: number;
        public nextLevelId: number;
        constructor() {
            super();
            this.msgSeq = 0;
            this.errorCode = 0;
            this.isPass = 0;
            this.nextLevelId = 0;
        }
        getCmd(): number {
            return Constants.GC_LevelEndRspd;
        }
        getUrl(): string {
            return "GCLevelEndRspd";
        }
        decode(data) {
            if (!data) {
                return this;
            }
            if (data._0) {
                this.msgSeq = parseInt(data._0);
            }
            if (data.c) {
                this.errorCode = parseInt(data.c) || 0;
            }
            if (data.d) {
                this.isPass = parseInt(data.d) || 0;
            }
            if (data.e) {
                this.nextLevelId = parseInt(data.e) || 0;
            }
            return this;
        }
    }
    let msgCmd2MsgTypeMap = {};
    msgCmd2MsgTypeMap[Constants.CG_LoginRqst] = CGLoginRqst;
    msgCmd2MsgTypeMap[Constants.GC_LoginRspd] = GCLoginRspd;
    msgCmd2MsgTypeMap[Constants.CG_UseItemRqst] = CGUseItemRqst;
    msgCmd2MsgTypeMap[Constants.GC_UseItemRspd] = GCUseItemRspd;
    msgCmd2MsgTypeMap[Constants.CG_GetItemRqst] = CGGetItemRqst;
    msgCmd2MsgTypeMap[Constants.GC_GetItemRspd] = GCGetItemRspd;
    msgCmd2MsgTypeMap[Constants.CG_LevelStartRqst] = CGLevelStartRqst;
    msgCmd2MsgTypeMap[Constants.GC_LevelStartRspd] = GCLevelStartRspd;
    msgCmd2MsgTypeMap[Constants.CG_LevelEndRqst] = CGLevelEndRqst;
    msgCmd2MsgTypeMap[Constants.GC_LevelEndRspd] = GCLevelEndRspd;
    export function createMsgObjectByCmd(msgCmd) {
        let msgType = msgCmd2MsgTypeMap[msgCmd];
        if (msgType) {
            return new msgType();
        }
        return null;
    }
    export function getMsgTypeByCmd(msgCmd) {
        return msgCmd2MsgTypeMap[msgCmd];
    }

