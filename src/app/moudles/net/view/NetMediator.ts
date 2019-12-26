import { createMsgObjectByCmd } from "./MsgCenter";
import ModuleName from "../../../../ModuleName";
import NetProxy from "../model/NetProxy";
import NetCmd from "../../../../NetCmd";
import DebugLog from "../../../../util/DebugLog";
import GlobalDefine from "../../../../GlobalDefine";

/**
  *
  * @author 
  *
  */
export default class NetMediator extends puremvc.Mediator {

    //记录请求连接的计时器
    //private _connectTimer: number = 0;

    public constructor() {
        super(ModuleName.NET_MEDIATOR);
        //初始化
        // Define.CurrServerUrl = Define.URL_ACCOUNT;
    }

    public listNotificationInterests(): string[] {
        return [NetCmd.SEND, NetCmd.BASIC_RECEIVE, NetCmd.GET];
    }

    public handleNotification(notification: puremvc.INotification): void {
        var cmd: string = notification.getName();
        var body: any = notification.getBody();
        switch (cmd) {
            case NetCmd.SEND://像服务器发送请求
                let acc = Laya.LocalStorage.getItem('_acc');
                let token = Laya.LocalStorage.getItem('_token');
                let data: string;
                if (acc == null)
                    data = 'c=' + body.getCmd() + '&r=' + JSON.stringify(body.encode()) + '&o=0' + '&t=0';
                else
                    data = 'c=' + body.getCmd() + '&r=' + JSON.stringify(body.encode()) + '&o=' + acc + '&t=' + token;
                var code = body.getCmd();
                var url = GlobalDefine.CurrServerUrl + body.getUrl() + '?v=' + GlobalDefine.Version.slice(1, GlobalDefine.Version.length);
                this.reqServer(url, data, code);
                break;
            case NetCmd.BASIC_RECEIVE://服务器返回消息
                if (body == "" || body == null)
                    return;
                this.praseBasicJson(body);
                // this.facade.sendNotification(NetCmd.RECEIVE,body);
                break;
        }
    }

    public onRegister(): void {
        DebugLog.log("netMediator onRegister");
    }

    private praseBasicJson(jsObj: string) {
        var tmp: Array<string> = [];
        var msg: string = jsObj;//"[" + jsObj + "]";
        try{
            tmp = JSON.parse(msg);
        }catch(e){
            
        }
        var len = tmp.length;
        if (tmp.length == 1) {
            var data = tmp[0];
            var rqstMsg = createMsgObjectByCmd(+data["c"]);
            if (rqstMsg != null) {
                rqstMsg.decode(data["r"]);
                // DebugLog.log('rqstMsg.errorCode==', rqstMsg.errorCode);
                if (rqstMsg.errorCode) {
                    let errorId: number = 900000000 + rqstMsg.errorCode;
                    // let configdata: LanguageXmlconfig = LanguageXmlManager.getInstance().getConfig(errorId);
                    // if (configdata) {
                    //     if (LanguageXmlManager.getInstance().getConfig(errorId)) {
                    //         if (configdata.Chinese) {
                    //             Helper.showTip(configdata.Chinese);
                    //         }
                    //     }
                    // } else {
                    //     DebugLog.log('rqstMsg== err:', rqstMsg);
                    //     // Helper.showTip(errorId + "");
                    // }
                    DebugLog.log('rqstMsg== err:', rqstMsg);

                }
                // if(rqstMsg.errorCode == 0)
                    this.facade.sendNotification(NetCmd.RECEIVE, rqstMsg);
            }
            return;
        }
        for (var i = 0; i < len; i++) {
            if (tmp[i]) {
                var data = tmp[i];
                var rqstMsg = createMsgObjectByCmd(+data["c"]);
                if (rqstMsg != null) {
                    rqstMsg.decode(data["r"]);
                    if (rqstMsg.errorCode) {
                        DebugLog.log('rqstMsg.errorCode===========', rqstMsg.errorCode);
                    }
                    this.facade.sendNotification(NetCmd.RECEIVE, rqstMsg);
                }
            }
        }
    }

    /*请求服务器数据*/
    private reqServer(url: string, param: string = null, no: number = 0): void {
        var cp: NetProxy = <NetProxy>this.facade.retrieveProxy(ModuleName.NET_PROXY);
        if (cp) {
            cp.addCmd(url, param, no);
            // Const.DEBUG("请求协议：" + param);
        }
    }
}
